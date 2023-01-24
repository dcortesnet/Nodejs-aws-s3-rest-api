const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const { v4 } = require("uuid");

require("dotenv").config();

const bucketName = String(process.env.AWS_BUCKET_NAME);
const urlS3 = `https://${bucketName}.s3.amazonaws.com`;
const app = express();
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

app.get("/", (req, res) => {
  return res.send("Hello Nodejs REST api s3");
});

app.get("/api/v1/files", async (req, res) => {
  try {
    const params = {
      Bucket: bucketName,
    };
    let { Contents } = await s3.listObjectsV2(params).promise();
    Contents = Contents?.map((content) => ({
      ...content,
      url: `${urlS3}/${content.Key}`,
    }));
    return res.json({ message: "List of files", files: Contents });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.post("/api/v1/files", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        detail: "Not file encountered"
      });
    }

    const params = {
      Bucket: bucketName,
      Key: v4() + "." + req.file?.originalname.split(".").pop(),
      Body: req.file?.buffer,
      ACL: "public-read",
      ContentType: req.file?.mimetype,
    };

    const file = await s3.upload(params).promise();
    return res.json({ message: "Successful upload", file });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete("/api/v1/files/:key", async (req, res) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: req.params.key,
    };
    await s3.deleteObject(params).promise();
    return res.json({ message: "Item removed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

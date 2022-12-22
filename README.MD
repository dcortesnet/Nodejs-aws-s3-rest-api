# Nodejs REST API S3 ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

API REST básica con la incorporación de AWS y nodejs, ejemplo práctico para el manejo de archivos con multer y S3.

## Pre-Requisitos

- Cuenta de AWS
- User de AWS con políticas `AmazonS3FullAccess`
- Bucket habilitado públicamente y con lista de control de acceso

## ENV variables

| ENV                 | Descripción                     |
| :------------------ | :------------------------------ |
| `AWS_ACCESS_KEY_ID` | clave de acceso ID              |
| `AWS_SECRET_KEY`    | clave de acceso secreta         |
| `AWS_BUCKET_NAME`   | Nombre del bucket a interactuar |
| `AWS_REGION`        | Región de bucket S3             |

## Endpoints

| Tipo   | Endpoint                                 | Body   |
| :----- | :--------------------------------------- | :----- |
| GET    | http://localhost:3000/api/v1/files/      |        |
| POST   | http://localhost:3000/api/v1/files/      | file (Form-data)     |
| DELETE | http://localhost:3000/api/v1/files/{key} |        |

## Instalación

Ejecutar comando

```
npm install
```

## Desarrollo

Se levantará un servidor en http://localhost:3000/

```bash
$ npm run dev
```

## Equipo

Desarrollado por Diego Cortés

- dcortes.net@gmail.com

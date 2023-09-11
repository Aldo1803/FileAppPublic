# File App

A simple web application built on Node.js to manage and upload files.

## Features

- User registration and login.
- JWT authentication.
- Upload files to AWS S3.
- Store temporary objects with expiration.

## Setup and Installation

**Clone the Repository**

```bash
git clone [Your Repository URL]
cd [Your Repository Name]
```

## Install dependencies
```bash
npm install
```

## Environment variables and configuration
Rename .env.sample to .env and update the values to match your configurations.

## Start the server
```bash
npm start
```

## Technologies used
- Node.js
- Express.js
- MongoDB
- Mongoose
- AWS S3
- JWT

# Endpoints
## Users
- POST /users: Sign up a new user.
- POST /users/login: Log in a user.
## Objects
- POST /objects: Create a new object.
- GET /objects: Retrieve all objects for a user.
- GET /objects/:id: Retrieve a specific object by ID.
## Token
- GET /verify: Verify the JWT token.

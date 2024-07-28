# Contact Manager

Welcome to the Contact Manager project! This application allows users to manage their contacts efficiently. Built with Node.js, Express, and MongoDB, it offers a robust backend to handle CRUD operations and user authentication.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Configuration](#configuration)
5. [Folder Structure](#folder-structure)
6. [API Endpoints](#api-endpoints)
7. [Authentication](#authentication)
8. [Testing APIs](#testing-apis)
9. [Running the Project](#running-the-project)
10. [Contributing](#contributing)
11. [License](#license)

## Features

- **CRUD Operations:** Create, Read, Update, and Delete contacts.
- **User Authentication:** Secure endpoints using JWT authentication.
- **Environment Configurations:** Manage sensitive information using environment variables.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Environment Management:** dotenv

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud instance like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/contact-manager.git
   ```

2. Navigate to the project directory:

   ```bash
   cd contact-manager
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=5000
CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster-url>/mycontacts-backend?retryWrites=true&w=majority&appName=<appName>
ACCESS_TOKEN_SECRET=<your_jwt_secret>
```

Replace `<username>`, `<password>`, `<cluster-url>`, and `<appName>` with your MongoDB credentials and cluster details. Set your own JWT secret for `ACCESS_TOKEN_SECRET`.

## Folder Structure

Here's a brief overview of the project structure:

```
contact-manager/
│
├── config/              # Configuration files (e.g., DB connection, JWT)
│   └── db.js            # MongoDB connection setup
│
├── controllers/         # Request handlers
│   ├── authController.js
│   └── contactController.js
│
├── middleware/          # Middleware functions
│   └── authMiddleware.js # JWT authentication middleware
│
├── models/              # Mongoose models
│   ├── User.js
│   └── Contact.js
│
├── routes/              # Express routes
│   ├── authRoutes.js
│   └── contactRoutes.js
│
├── .env                 # Environment variables
├── app.js               # Entry point of the application
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Authenticate a user and get a JWT

### Contacts

- **GET** `/api/contacts` - Get all contacts (requires authentication)
- **POST** `/api/contacts` - Create a new contact (requires authentication)
- **GET** `/api/contacts/:id` - Get a specific contact by ID (requires authentication)
- **PUT** `/api/contacts/:id` - Update a contact by ID (requires authentication)
- **DELETE** `/api/contacts/:id` - Delete a contact by ID (requires authentication)

## Authentication

JWT authentication is used to secure the API endpoints. Here's a brief overview of how it works:

1. **User Registration:** Users can register by sending a `POST` request to `/api/auth/register` with their credentials.
2. **User Login:** Users authenticate by sending a `POST` request to `/api/auth/login`. Upon successful login, they receive a JWT token.
3. **Access Protected Routes:** Include the JWT token in the `Authorization` header (as `Bearer <token>`) for accessing protected routes.

The JWT token is used to verify the identity of the user and ensure they have the right to access specific resources.

## Testing APIs

You can test the APIs using tools like Thunder Client and Insomnia. Here’s how:

### Thunder Client

1. **Install Thunder Client:** You can find it in the VS Code extensions marketplace.
2. **Set Up Requests:** Create new requests for each endpoint with the appropriate HTTP method.
3. **Add Headers:** For protected routes, include the `Authorization` header with the value `Bearer <your_token>`.

### Insomnia

1. **Install Insomnia:** Download and install Insomnia from [Insomnia](https://insomnia.rest/).
2. **Create Requests:** Add new requests for each API endpoint.
3. **Set Authentication:** Use the JWT token for authentication by adding it in the `Authorization` header with the value `Bearer <your_token>`.

## Running the Project

To start the application, run:

```bash
npm start
```

The server will run on `http://localhost:5000` by default.

## Contributing

Feel free to open an issue or submit a pull request if you want to contribute to the project. Please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

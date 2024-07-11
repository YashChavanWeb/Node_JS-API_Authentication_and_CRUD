# Express API Setup and Basics

## HTTP Methods

- **GET** - Retrieve data from the server.
- **POST** - Create data and send it to the server.
- **PUT** - Update existing data on the server.
- **DELETE** - Remove data from the server.

## Creating Files

1. **Initialize a Node.js project:**

   ```bash
   npm init -y
   ```

2. **Install necessary modules:**

   ```bash
   npm install express nodemon
   ```

   - `nodemon` is used to automatically restart the server when files are saved.

3. **Add scripts to `package.json`:**
   ```json
   "scripts": {
     "start": "nodemon server.js"
   }
   ```

## Basic Structure to Use Express and Run It on a Port

```javascript
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
```

## Creating a GET API

```javascript
app.get("/api/contacts", (req, res) => {
  res.json({ message: "Get all the contacts" });
});
```

- Use `res.send()` for text response.
- Use `res.json()` for JSON response.
- Use status code: `res.status(200).json({})`.

## Creating a Folder to Handle All Routes

1. **Create a route file and export the router:**

   ```javascript
   const express = require("express");
   const router = express.Router();

   router.route("/").get((req, res) => {
     res.json({ message: "Get all the contacts" });
   });

   module.exports = router;
   ```

2. **Use this route in your main server file:**
   ```javascript
   app.use("/api/contacts", require("./routes/contactRoutes"));
   ```

## API Methods

- **GET** - Retrieve data.
- **POST** - Create data.
- **PUT** - Update data.
- **DELETE** - Delete data.

## Getting Params from the URL

```javascript
res.json({ message: `Delete this contact ${req.params.id}` });
```

- Extract ID from the URL string: `http://localhost:5000/api/contacts/2`.

## Creating a Folder for the Controller

1. **Create controller logic:**

   ```javascript
   const getContacts = (req, res) => {
     res.json({ msg: "Get all contacts" });
   };

   module.exports = { getContacts };
   ```

2. **Import and use in the routes file:**

   ```javascript
   const {
     getContacts,
     getContact,
     createContact,
     updateContact,
     deleteContact,
   } = require("../controllers/contactController");

   router.route("/").get(getContacts);
   ```

3. **Optimize routes with similar paths:**

   ```javascript
   router.route("/").get(getContacts).post(createContact);

   router
     .route("/:id")
     .put(updateContact)
     .get(getContact)
     .delete(deleteContact);
   ```

## Accepting the Body of a Request in the Controller

1. **Modify the method to accept the body:**

   ```javascript
   const getContacts = (req, res) => {
     console.log(req.body);
     res.json({ message: req.body });
   };
   ```

2. **Use middleware to parse JSON:**

   ```javascript
   app.use(express.json());
   ```

3. **Error handling and destructuring:**
   ```javascript
   const { name, email, phone } = req.body;
   if (!name || !email || !phone) {
     res.status(400);
     throw new Error("Please enter all the fields");
   }
   ```

## Creating Custom Middleware

1. **Error handler middleware:**

   ```javascript
   const errorHandler = (err, req, res, next) => {
     const statusCode = res.statusCode ? res.statusCode : 500;
     res.json({ message: err.message, stackTrace: err.stack });
   };

   module.exports = errorHandler;
   ```

2. **Use middleware in the server:**
   ```javascript
   app.use(errorHandler);
   ```

## Creating a Switch Case and Separate File for Error Codes

1. **Switch case for error codes:**

   ```javascript
   switch (statusCode) {
     case constants.VALIDATION_ERROR:
       res.json({
         title: "Validation Error",
         message: err.message,
         stackTrace: err.stack,
       });
       break;

     case constants.SERVER_ERROR:
       res.json({
         title: "Server Error",
         message: err.message,
         stackTrace: err.stack,
       });
       break;

     default:
       console.log("No error, all good");
   }
   ```

2. **Error codes in a constants file:**
   ```javascript
   exports.constants = {
     VALIDATION_ERROR: 400,
     UNAUTHORIZED: 401,
     FORBIDDEN: 403,
     NOT_FOUND: 404,
     SERVER_ERROR: 500,
   };
   ```

## Async Handler

1. **Handle async operations:**

   - When interacting with the MongoDB, use `async` and `await`.

2. **Use `express-async-handler` to handle errors:**

   ```bash
   npm install express-async-handler
   ```

3. **Import and use in the controller:**

   ```javascript
   const asyncHandler = require("express-async-handler");

   const getContacts = asyncHandler(async (req, res) => {
     // Your async code here
   });
   ```

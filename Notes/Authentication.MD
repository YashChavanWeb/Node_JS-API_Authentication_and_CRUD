# User Authentication and Authorization with Express and MongoDB

## Overview

This guide walks through setting up user authentication and authorization in an Express.js application using MongoDB. We will cover:

1. Setting up routes for user registration, login, and fetching current user info.
2. Creating controller functions for these routes.
3. Implementing user registration and login logic, including password hashing and JWT authentication.
4. Securing routes to allow only authenticated users to access certain endpoints.

## Prerequisites

- Node.js and npm installed.
- MongoDB set up and running.
- Basic knowledge of Express.js and MongoDB.

## Setup

### Step 1: Add Routes in `server.js`

Add the following route to `server.js`:

```javascript
app.use("/api/users", require("./routes/userRoutes"));
```

### Step 2: Create User Routes

Create a file named `userRoutes.js` in the `routes` folder with the following content:

```javascript
const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json("Register the user");
});
router.post("/login", (req, res) => {
  res.json("Login the user");
});
router.get("/current", (req, res) => {
  res.json("Current information of the user");
});

module.exports = router;
```

### Step 3: Create User Controllers

Create a file named `userController.js` in the `controllers` folder with the following content:

```javascript
const asyncHandler = require("express-async-handler");

// @desc Register the user
// @route POST /api/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  res.json("Register the user");
});

// @desc Login the user
// @route POST /api/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  res.json("Login the user");
});

// @desc Get current user info
// @route GET /api/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json("Information of the user");
});

module.exports = { registerUser, loginUser, currentUser };
```

### Step 4: Update Routes to Use Controllers

Modify `userRoutes.js` to use the controllers:

```javascript
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", currentUser);

module.exports = router;
```

## User Registration

### Step 1: Implement User Registration Logic

Update the `registerUser` function in `userController.js`:

```javascript
const bcrypt = require("bcryptjs");
const User = require("../models/userModel"); // Assume a User model is defined in models/userModel.js

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user with the same email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);
  // 10 is the number of salt rounds it will undergo
  console.log(hashedPassword);

  // After the password is hashed, we can store the created user in the database
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created: ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400).json("User data is not valid");
  }

  res.json({ message: "User is registered" });
});
```

## User Login

### Step 1: Install JWT

Install the `jsonwebtoken` package:

```sh
npm install jsonwebtoken
```

### Step 2: Implement User Login Logic

Update the `loginUser` function in `userController.js`:

```javascript
const jwt = require("jsonwebtoken");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        // payload
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      // access token secret
      process.env.ACCESS_TOKEN_SECRET,
      // expiration time for the token
      { expiresIn: "1m" }
    );

    res.status(200).json({ accessToken });
  } else {
    res.status(400).json("Invalid credentials");
  }
});
```

## Securing Routes

### Step 1: Create Middleware to Validate JWT

Create a file named `validateToken.js` in the `middleware` folder:

```javascript
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedInfo) => {
      if (err) {
        res.status(401);
        throw new Error("User not authorized");
      }

      req.user = decodedInfo.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("User not authorized or token is missing");
    }
  }
});

module.exports = validateToken;
```

### Step 2: Secure the `/current` Route

Update `userRoutes.js` to secure the `/current` route:

```javascript
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
```

## Fetch Current User

Update the `currentUser` function in `userController.js`:

```javascript
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
  // This is valid because in the validateToken middleware, req.user is appended by decodedInfo.user
});
```

## Protecting All Routes

### Step 1: Update Contact Schema

Add a `user_id` field to the contact schema:

```javascript
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please enter the contact name"],
  },
  // other fields...
});

module.exports = mongoose.model("Contact", contactSchema);
```

### Step 2: Secure Contact Routes

In the `contactRoutes.js` file, use the `validateToken` middleware:

```javascript
const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");

router.use(validateToken); // This way we make all the routes private
// router.get('/current', validateToken, currentUser) // If we want to add individually, we can do like this

router.get("/", getContacts);
router.post("/", createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
```

### Step 3: CRUD Operations Using User ID

Update the contact controller functions to use `req.user.id`:

```javascript
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

// Similar updates for updateContact and deleteContact
if (contact.user_id.toString() !== req.user.id) {
  // this means that some different user is trying to delete the contact so show error
  res.status(401);
  throw new Error("Not authorized to delete this contact");
}
```

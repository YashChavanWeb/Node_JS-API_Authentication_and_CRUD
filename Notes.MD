# HTTP methods

- get - get data from the server
- post - create own data and put on server
- put - update the data
- delete - delete a data

# Creating Files

- package.json - npm init -y
- node modules - npm install express nodemon
  Note: nodemon is used for restarting the server when we save the file again
- we need to add scripts in package.json to start our server
  "start": "nodemon server.js", etc

# Basic structure to use express and run it on the port

const express = require('express')
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000

app.listen(port, (req, res) => {
console.log(`Server is running on ${port}`)
})

# Get api creation

app.get('/api/contacts', (req, res) => {
res.json({ message: 'Get all the contacts' });
})

Note: for text response use res.send() , for json response use res.json({})
we can also use the status code res.status(200).json({})

# Creating a folder to handle all the routes

first create a file and then export router there
const express = require('express');
const router = express.Router();

then we use route and get method to create the logic of the route
router.route('/').get((req, res) => {
res.json({ message: 'Get all the contacts' });
});

and finally we export it using module exports
module.exports = router;

now we use this from the file into our code using a middleware - use and also a require method
app.use('/api/contacts', require('./routes/contactRoutes'))

Different methods for API-
GET - to get the data
POST - to create the data
PUT - to update the data
DELETE - to delete the dataq

How do we get the params of the id from the api
res.json({ message: `Delete this contact ${req.params.id}` });
the id is extracted from the url string http://localhost:5000/api/contacts/2

# creating a folder for the controller

- controller will have the logic for the request and response and we will also interact with the database
- we give a variable name to the router in the controller
  const getContacts = (req, res) => {
  res.json({ msg: 'Get all contacts' })
  }
- then export it as
  module.exports = { getContacts }

- then we have its importing and usage in the routes file
  const {
  getContacts, getContact, createContact, updateContact, deleteContact
  } = require('../controllers/contactController')
  router.route('/').get(getContacts);

- now that we have all the files one optimization as two routes are same
  // route for getting all the contacts
  router.route('/').get(getContacts);

// route for adding a contact
router.route('/').post(createContact)

so we can add it in the same line as their route is similar that is /
similarly do for put, get and delete

# accepting the body of a request


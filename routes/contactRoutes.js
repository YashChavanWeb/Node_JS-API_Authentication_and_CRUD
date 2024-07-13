const express = require('express');
const router = express.Router();
const {
    getContacts, getContact, createContact, updateContact, deleteContact
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');



router.use(validateToken)   // this way we will make all the routes as private
// router.get('/current', validateToken, currentUser)   // if we want to add individually then we can do like this



// // route for getting all the contacts
// router.route('/').get(getContacts);

// // route for adding a contact
// router.route('/').post(createContact)

router.route('/').get(getContacts).post(createContact);





// route for getting a specific contact
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

// // route for updating a contact
// router.route('/:id').put(updateContact)

// // route for deleting this contact
// router.route('/:id').delete(deleteContact)


module.exports = router;
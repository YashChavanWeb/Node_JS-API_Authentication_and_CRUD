const asyncHandler = require('express-async-handler');


// whenever we create some API methods we have to add some labels to it

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
    // res.status(200).json({ msg: 'Get all contacts' })
    // console.log(req.body)
    // res.json({message: req.body})


    // destructuring and error handling when we get an empty object
    const { name, email, phone } = req.body;
    // res.send(req.body)
    // console.log(req.body)
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("Please enter all the fields")
    }
});


// @desc Get the contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({ msg: `Get the contact for ${req.params.id}` })
})


// @desc Create a new contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Add this contact' });
})


// @desc Update a contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update this contact ${req.params.id}` });
})


// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete this contact ${req.params.id}` });
})


module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };
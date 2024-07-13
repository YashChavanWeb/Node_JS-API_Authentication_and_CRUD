const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel')


// whenever we create some API methods we have to add some labels to it

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {


    const contacts = await Contact.find();
    res.status(200).json(contacts);

    // res.status(200).json({ msg: 'Get all contacts' })
    // console.log(req.body)
    // res.json({message: req.body})
});


// @desc Get the contact
// @route GET /api/contacts/:id
// @access public
const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id)

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact)
    // res.status(200).json({ msg: `Get the contact for ${req.params.id}` })
})


// @desc Create a new contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {

    // destructuring and error handling when we get an empty object
    const { name, email, phone } = req.body;
    // res.send(req.body)
    // console.log(req.body)


    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("Please enter all the fields")
    }
    // the function will stop after the if condition is true

    // if we don't use await here then it will not wait for fetching the data and directly show the result
    const contact = await Contact.create(
        {
            name,
            email,
            phone,
        }
        // we have already destructured the name email and phone above in req.body so here we directly use them as key name and value name is the same
    )
    res.status(200).json(contact);



    // res.status(200).json({ message: 'Add this contact' });
})


// @desc Update a contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id)

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        // new is used so that mongoose returns the updated document
        // if new is false or not mentioned mongoose returns the document as it is earlier
    );

    res.status(200).json(updatedContact);


    // res.status(200).json({ message: `Update this contact ${req.params.id}` });
})


// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // delete the contact we got
    await Contact.deleteOne({ _id: req.params.id });  // Using deleteOne() instead of remove()
    res.status(200).json({ message: 'Contact removed' });
});


module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };
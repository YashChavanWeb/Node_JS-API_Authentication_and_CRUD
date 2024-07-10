// whenever we create some API methods we have to add some labels to it

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const getContacts = (req, res) => {
    res.status(200).json({ msg: 'Get all contacts' })
}


// @desc Get the contact
// @route GET /api/contacts/:id
// @access public
const getContact = (req, res) => {
    res.status(200).json({ msg: `Get the contact for ${req.params.id}` })
}


// @desc Create a new contact
// @route POST /api/contacts
// @access public
const createContact = (req, res) => {
    res.status(200).json({ message: 'Add this contact' });
}


// @desc Update a contact
// @route PUT /api/contacts/:id
// @access public
const updateContact = (req, res) => {
    res.status(200).json({ message: `Update this contact ${req.params.id}` });
}


// @desc Delete a contact
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete this contact ${req.params.id}` });
}


module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };
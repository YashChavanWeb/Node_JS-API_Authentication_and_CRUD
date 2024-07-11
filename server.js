const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000

app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`)
})

app.use(express.json())
app.use('/api/contacts', require('./routes/contactRoutes'))
app.use(errorHandler)



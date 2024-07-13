const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
        });
        console.log(`MongoDB Connected: ${mongoose.connection.host} and ${mongoose.connection.name}`);
    } catch (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;

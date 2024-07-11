
const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    // res.json({ message: err.message, stackTrace: err.stack });
    // stack trace tells the sequence of functions so that it is easier to debug the error

    switch (statusCode) {

        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Errpr", message: err.message, stackTrace: err.stack })
            break;

        case constants.NOT_FOUND:
            res.json({ title: "Not Found Error", message: err.message, stackTrace: err.stack })
            break;

        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized Error", message: err.message, stackTrace: err.stack })
            break;

        case constants.FORBIDDEN:
            res.json({ title: "Forbidden Error", message: err.message, stackTrace: err.stack })
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack })
            break;

        default:
            console.log("No error all good")

    }

};

module.exports = errorHandler;
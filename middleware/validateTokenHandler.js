const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const validateToken = asyncHandler(async (req, res, next) => {
    let token;

    // we should be able to fetch the data in both the cases so we are adding this check
    let authHeader = req.headers.Authorization || req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        // now here once we have the token we need to verify it using the JWT
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedInfo) => {
            if (err) {
                res.status(401)
                throw new Error("User not authorized")
            }

            // appending the decoded user info to the requesting user info
            req.user = decodedInfo.user

            // this is the middleware
            next()
        })

        if (!token) {
            res.status(401)
            throw new Error("User not authorized or token is missing")
        }
    }
})

module.exports = validateToken
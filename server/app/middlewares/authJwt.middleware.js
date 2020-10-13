const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const token = req.headers["x-access-token"];
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, process.env.BACKEND_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
         // pass the execution off to whatever request the client intended
    })
}

module.exports = {
    authenticateToken
}
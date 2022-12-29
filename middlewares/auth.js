const JWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) return res.status(403).json({ error: true, message: "a token is required for authentication" })

    try {
        const decoded = JWT.verify(token, process.env.TOKEN_SECRET)
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next()
}
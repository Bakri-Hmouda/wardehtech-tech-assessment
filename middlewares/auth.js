const JWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    const token = req.cookies.token

    if (!token) return res.status(403).json({ error: true, message: "a token is required for authentication, please login" })

    try {
        const decoded = JWT.verify(token, process.env.TOKEN_SECRET)
    } catch {
        return res.status(401).json("Invalid Token, please logout and login again")
    }

    return next()
}
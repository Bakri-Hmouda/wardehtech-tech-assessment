const userDB = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findOne } = require('../models/student')

/**
 * create a user
 *  
 */
exports.createEntity = async (req, res, next) => {
    const { userName, password, firstName, lastName } = req.body

    // check if all field are required
    if (!userName || !password, !firstName, !lastName) return res.status(400).json('all fields are required')

    // check if username name exist
    const userNameExist = await userDB.findOne({ userName: userName }).catch(err => next(err))
    if (userNameExist) return res.status(400).json('username already exist')

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10)

    // build data object with encrypted password
    const data = { userName, password: encryptedPassword, firstName, lastName }

    try {
        const user = await userDB.create(data)
        res.status(200).json(user)
    } catch (error) {
        next(
            {
                status: 500,
                message: error.message
            })
    }
}



/**
 * reset a user password
 *  
 */
exports.updateEntity = async (req, res, next) => {
    const { userName, password, newPassword } = req.body

    // check if all field are required
    if (!userName || !password || !newPassword) return res.status(400).json('username and password are required')

    try {
        // get user details from database
        const user = await userDB.findOne({ userName })

        // check if user inputted the right old password
        const isMatch = await bcrypt.compare(password, user.password)

        if (user && isMatch) {
            // encrypt password
            const encryptedPassword = await bcrypt.hash(newPassword, 10)

            // write new password to user database
            user.password = encryptedPassword
            await user.save()
            res.status(200).json(user)
        } else {
            res.status(404).json('wrong username or password')
        }

    } catch (error) {
        next(
            {
                status: 500,
                message: error.message
            })
    }
}


/**
 * delete a user
 *  
 */
exports.deleteEntity = async (req, res) => {
    const { id } = req.params

    try {
        const user = await userDB.findByIdAndDelete(id)

        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json(`no user with id: ${id} was found in database.`)
        }

    } catch (error) {
        next(
            {
                status: 500,
                message: error.message
            })
    }
}


/**
 * sign in a user
 *  
 */
exports.login = async (req, res, next) => {
    const { userName, password } = req.body

    if (!userName || !password) {
        return res.status(400).json('username and password are required')
    }

    try {
        const user = await userDB.findOne({ userName })
        const isMatch = await bcrypt.compare(password, user?.password)

        if (user && isMatch) {
            const token = jwt.sign(
                {
                    id: user?._id
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "30d"
                })

            res.status(200)
            res.cookie('token', token, { httpOnly: true })
            res.json('successfully signed in!')
        } else {
            res.status(401).json('wrong username or password')
        }
    }
    catch (err) { next(err) }
}


/**
 * logout in a user
 *  
 */
exports.logout = async (req, res) => {
    res.status(200)
    res.clearCookie('token')
    res.redirect('/api/v1/welcome')
    res.end()
}
const express = require('express');
const app = express()
const env = require('dotenv').config()
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL
const Mongoose = require('mongoose')

/**
 * use modules middleWares
 */
app.use(logger('dev'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// welcome route
app.get('/api/v1/welcome', (req, res) => res.json('welcome to the university system'))


/**
 * connect to database
 */
Mongoose.set('strictQuery', false)
Mongoose.connect(DB_URL, () => console.log('connected successfully to database'))


/**
 * import & use routes
 */
const student_route = require('./routes/student')
const user_route = require('./routes/user')

app.use('/api/v1/student', student_route);
app.use('/api/v1/user', user_route);


/**
 * Error handler
 */
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: true,
        message: err.message
    })
})


/**
 * start server with the specified port in the ENV or port 5000
 */
app.listen(PORT, () => { console.log(`server up and running on port: ${PORT}`) })
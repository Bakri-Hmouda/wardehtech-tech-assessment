const express = require('express');
const app = express()
const env = require('dotenv').config()
const logger = require('morgan')
const PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_URI
const Mongoose = require('mongoose')


/**
 * connect to database
 */
Mongoose.connect(DB_URI, () => console.log('connected successfully to database'))

/**
 * import routes
 */
const student_route = require('./routes/student')
const user_route = require('./routes/user')
// test route
app.get('/test', (req, res) => res.json('app is working'))


app.use('/student', student_route);
app.use('/user', user_route);



/**
 * start server with the specified port in the ENV or port 5000
 */
app.listen(PORT, () => { console.log(`server up and running on port: ${PORT}`) })
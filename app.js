const express = require('express');
const app = express()
const env = require('dotenv').config()
const logger = require('morgan')
const PORT = process.env.PORT || 5000

// routes imports
const student_route = require('./routes/student')
const user_route = require('./routes/user')

app.use('/student', student_route);
app.use('/user', user_route);

app.listen(PORT, () => { console.log(`server up and running on port: ${PORT}`) })
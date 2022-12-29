const express = require('express');
const app = express()
const env = require('dotenv').config()
const logger = require('morgan')
const PORT = process.env.PORT || 5000


app.listen(PORT, () => { console.log(`server up and running on port: ${PORT}`) })
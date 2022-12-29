const { Schema, model } = require('mongoose')

const student_schema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        countryCode: {
            type: String,
            required: true,
        }
    }
    ,
    {
        timestamps: true,
        collection: 'students'
    }

)

module.exports = model('student', student_schema)
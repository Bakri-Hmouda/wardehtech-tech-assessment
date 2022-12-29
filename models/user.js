const { Schema, model } = require('mongoose')

const user_schema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },

    },
    {
        timestamps: true,
        collection: 'users'
    }
)

module.exports = model('user', user_schema)
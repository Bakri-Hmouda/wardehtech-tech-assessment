const studentDB = require('../models/student')
const Mongoose = require('mongoose')

/**
 * get one student
 *  
 */
exports.getEntity = async (req, res, next) => {
    const { id } = req.params
    if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(400).json(` the (id: ${id}), provided is not a valid id`)

    try {
        const student = await studentDB.findById(id)

        if (student) {
            res.status(200).json(student)
        }
        else {
            res.status(404).json(`user with id: ${id} was not found`)
        }
    }
    catch (error) {
        next(
            {
                status: 500,
                message: error.message
            })
    }
}


/**
 * get all students with pagination
 *  
 */
exports.getEntities = async (req, res, next) => {

    try {
        const students = await studentDB.find().sort({ createdAt: 'desc' }).limit(10).exec()
        res.status(200).json(students)
    }
    catch (error) {
        next(
            {
                status: 500,
                message: error.message
            })
    }
}


/**
 * create a student
 *  
 */
exports.createEntity = async (req, res, next) => {
    const { body: data } = req

    try {
        const student = await studentDB.create(data)
        res.status(200).json(student)
    } catch (error) {
        next(
            {
                status: 500,
                message: error.message
            })
    }
}


/**
 * update a student
 *  
 */
exports.updateEntity = async (req, res, next) => {
    const { id } = req.params
    const { body: data } = req

    try {
        const student = await studentDB.findByIdAndUpdate(id, data)
        if (student) {
            res.status(200).json(student)
        }
        else {
            res.status(404).json(`no student with id: ${id} was found in database.`)
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
 * delete a student
 *  
 */
exports.deleteEntity = async (req, res, next) => {
    const { id } = req.params

    try {
        const student = await studentDB.findByIdAndDelete(id)

        if (student) {
            res.status(200).json(student)
        }
        else {
            res.status(404).json(`no student with id: ${id} was found in database.`)
        }

    } catch (error) {
        next(
            {
                status: 500,
                message: error.message
            })
    }
}
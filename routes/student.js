const router = require('express').Router()
const controller = require('../controllers/student')

/**
 * student routes
 */
router.route('/').get(controller.getEntities) // get all students
router.route('/:id').get(controller.getEntity) // get one student
router.route('/create').post(controller.createEntity) // create a student
router.route('/update/:id').put(controller.updateEntity) // update a student
router.route('/delete/:id').delete(controller.deleteEntity) // delete a student

module.exports = router;
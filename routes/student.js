const router = require('express').Router()
const controller = require('../controllers/student')
const auth = require('../middlewares/auth')

/**
 * student routes
 */
router.route('/').get(auth, controller.getEntities) // get all students
router.route('/:id').get(auth, controller.getEntity) // get one student
router.route('/create').post(auth, controller.createEntity) // create a student
router.route('/update/:id').put(auth, controller.updateEntity) // update a student
router.route('/delete/:id').delete(auth, controller.deleteEntity) // delete a student

module.exports = router;
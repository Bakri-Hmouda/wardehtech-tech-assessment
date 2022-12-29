const router = require('express').Router()
const controller = require('../controllers/user')

/**
 * user routes
 */
router.route('/login').post(controller.signIn) // signIn user
router.route('/logout').post(controller.logout) // logout user
router.route('/register').post(controller.createEntity) // create a user
router.route('/reset-pass').put(controller.updateEntity) // update a student
router.route('/delete/:id').delete(controller.deleteEntity) // delete a student

module.exports = router;
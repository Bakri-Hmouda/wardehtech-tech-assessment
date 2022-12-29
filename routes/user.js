const router = require('express').Router()
const controller = require('../controllers/user')

/**
 * user routes
 * not auth has been used here, requirement are a bit unclear.
 */
router.route('/login').post(controller.login) // signIn user
router.route('/logout').post(controller.logout) // logout user
router.route('/register').post(controller.createEntity) // create a user
router.route('/reset-pass').put(controller.updateEntity) // update a student
router.route('/delete/:id').delete(controller.deleteEntity) // delete a student

module.exports = router;
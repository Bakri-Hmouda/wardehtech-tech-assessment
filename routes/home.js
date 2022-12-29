const router = require('express').Router()
const controller = require('../controllers/home')
/**
 * homepage route
 */
router.route("/").get(controller.get)

module.exports = router
const {Router} = require('express')
const {createUser, loginUser, logoutUser} = require('../controllers/user-controllers.js')

const router = Router()

router.route('/register').post(createUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logoutUser)

module.exports = router
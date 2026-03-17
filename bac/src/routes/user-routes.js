const {Router} = require('express')
const createUser = require('../controllers/user-controllers.js')

const router = Router()

router.route('/register').post(createUser)

module.exports = router
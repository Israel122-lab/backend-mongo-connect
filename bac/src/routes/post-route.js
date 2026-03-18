const {Router} = require('express')
const {createPost} = require('../controllers/post-controller.js')
const {getPosts} = require('../controllers/post-controller.js')


const router = Router()

router.route('/create').post(createPost)
router.route('/getposts').get(getPosts)

module.exports = router
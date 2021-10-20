const express = require('express')
const usersController = require('../controllers/users.js')
const router = express.Router()

const auth = require("../middleware/authentication")


router.get('/', usersController.getAllUsers)

router.get('/:user_id', usersController.getUserById)


// example has these signup and login combined with one route, and called next() after signup. I split it into 2 because I can't seem to call next() without errors
router.post('/signup', usersController.createUser)

router.post('/login', usersController.loginUser)
//

router.put('/:user_id', usersController.updateUserById)

router.delete('/:user_id', usersController.deleteUserById)

module.exports = router
const express = require('express')
const usersController = require('../controllers/users.js')
const router = express.Router()

router.get('/', usersController.getAllUsers)

router.get('/:user_id', usersController.getUserById)

router.post('/', usersController.createUser)

router.put('/:user_id', usersController.updateUserById)

router.delete('/:user_id', usersController.deleteUserById)

module.exports = router
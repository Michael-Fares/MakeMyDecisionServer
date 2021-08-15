const express = require('express')
const optionsController = require('../controllers/options.js')
const router = express.Router()

router.get('/', optionsController.getAllOptions)

router.get('/for-decision/:id', optionsController.listOptionsByDecisionId)

router.post('/', optionsController.createOption)

router.put('/:id', optionsController.updateOptionById)

router.delete('/:first_name', optionsController.deleteOptionById)

module.exports = router
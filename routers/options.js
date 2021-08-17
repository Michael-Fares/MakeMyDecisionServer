const express = require('express')
const optionsController = require('../controllers/options.js')
const router = express.Router()

router.get('/', optionsController.getAllOptions)

router.get('/:option_id', optionsController.getOptionById)

router.get('/for-decision/:decision_id', optionsController.listOptionsByDecisionId)

router.post('/for-decision/:decision_id', optionsController.createOptionByDecisionId)

router.put('/:option_id', optionsController.updateOptionById)

router.delete('/:option_id', optionsController.deleteOptionById)

module.exports = router
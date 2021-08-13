const express = require('express')
const decisionsController = require('../controllers/decisions.js')
const router = express.Router()

router.get('/', decisionsController.getAllDecisions)

router.get('/:id', decisionsController.getDecisionById)

router.post('/', decisionsController.createDecision)

router.put('/:id', decisionsController.updateDecisionById)

router.delete('/:first_name', decisionsController.deleteDecisionById)

module.exports = router
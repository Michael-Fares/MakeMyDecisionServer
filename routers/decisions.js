const express = require('express')
const decisionsController = require('../controllers/decisions.js')
const router = express.Router()

const auth = require("../middleware/authentication")


router.get('/', decisionsController.getAllDecisions)

router.get('/:decision_id', decisionsController.getDecisionById)

router.get('/for-user/:user_id', decisionsController.listDecisionsByUserId)

router.post('/', auth.checkJwt, decisionsController.createDecisionByUserId)

router.put('/:decision_id', decisionsController.updateDecisionById)

router.delete('/:decision_id', decisionsController.deleteDecisionById)

module.exports = router
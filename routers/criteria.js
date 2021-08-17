const express = require('express')
const criteriaController = require('../controllers/criteria.js')
const router = express.Router()

router.get('/', criteriaController.getAllCriteria)

router.get('/:criterion_id', criteriaController.getCriterionById)

router.get('/for-decision/:decision_id', criteriaController.listCriteriaByDecisionId)

router.post('/for-decision/:decision_id', criteriaController.createCriterionByDecisionId)

router.put('/:criterion_id', criteriaController.updateCriterionById)

router.delete('/:criterion_id', criteriaController.deleteCriterionById)

module.exports = router
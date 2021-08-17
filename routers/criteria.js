const express = require('express')
const criteriaController = require('../controllers/criteria.js')
const router = express.Router()

router.get('/', criteriaController.getAllCriteria)

// router.get('/:criterion_id', criteriaController.getCriterionById)

router.get('/for-decision/:id', criteriaController.listCriteriaByDecisionId)

router.post('/for-decision/:id', criteriaController.createCriterionByDecisionId)

router.put('/:id', criteriaController.updateCriterionById)

router.delete('/:first_name', criteriaController.deleteCriterionById)

module.exports = router
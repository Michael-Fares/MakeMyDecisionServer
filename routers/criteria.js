const express = require('express')
const criteriaController = require('../controllers/criteria.js')
const router = express.Router()

router.get('/', criteriaController.getAllCriteria)

router.get('/:id', criteriaController.getCriterionById)

router.post('/', criteriaController.createCriterion)

router.put('/:id', criteriaController.updateCriterionById)

router.delete('/:first_name', criteriaController.deleteCriterionById)

module.exports = router
const express = require('express')
const rankingsController = require('../controllers/rankings.js')
const router = express.Router()

router.get('/', rankingsController.getAllRankings)

router.get('/:id', rankingsController.getRankingsByDecisionId)

router.post('/', rankingsController.createRanking)

router.put('/:id', rankingsController.updateRankingById)

router.delete('/:first_name', rankingsController.deleteRankingById)

module.exports = router
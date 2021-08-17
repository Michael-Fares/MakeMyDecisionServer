const express = require('express')
const rankingsController = require('../controllers/rankings.js')
const router = express.Router()

router.get('/', rankingsController.getAllRankings)

router.get('/for-option/:option_id/on-criterion/:criterion_id', rankingsController.getRankingById)

router.get('/for-decision/:decision_id', rankingsController.listRankingsByDecisionId)

router.post('/for-option/:option_id/on-criterion/:criterion_id', rankingsController.createRanking)

router.put('/for-option/:option_id/on-criterion/:criterion_id', rankingsController.updateRankingById)

router.delete('/for-option/:option_id/on-criterion/:criterion_id', rankingsController.deleteRankingById)

module.exports = router
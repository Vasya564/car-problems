const express = require('express')
const router = express.Router()

const {
    scrapeData,
    scrapeProblem
} = require('../controllers/scrapeController')

router.get('/', scrapeData)

router.post('/problem', scrapeProblem)

module.exports = router
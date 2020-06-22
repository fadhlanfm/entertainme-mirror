const router = require('express').Router()
const entertainMeController = require('../controllers/entertainMeController')
const moviesRouter = require('./movies')
const tvSeriesRouter = require('./tvSeries')

router.get('/', entertainMeController.findAll)
router.use('/movies', moviesRouter)
router.use('/tv_series', tvSeriesRouter)

module.exports = router
const router = require('express').Router()
const tvSeriesController = require('../controllers/tvSeries')

router.get('/', tvSeriesController.findAll)
router.get('/:id', tvSeriesController.findOne)
router.post('/', tvSeriesController.addTvSeries)
router.put('/:id', tvSeriesController.editTvSeries)
router.delete('/:id', tvSeriesController.deleteTvSeries)

module.exports = router
const router = require('express').Router();
const tvSeriesController = require('../controllers/tvSeries')

router.get('/tvseries', tvSeriesController.showTvSeries)
router.get('/tvseries/:id', tvSeriesController.showOneTvSeries)
router.post('/tvseries', tvSeriesController.addTvSeries)
router.put('/tvseries/:id', tvSeriesController.updateTvSeries)
router.delete('/tvseries/:id', tvSeriesController.deleteTvSeries)

module.exports = router
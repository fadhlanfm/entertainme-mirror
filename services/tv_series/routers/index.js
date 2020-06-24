const router = require("express").Router();
const tvSeriesController = require("../controllers/tvSeries");

router.get("/tvseries", tvSeriesController.getAllTvSeries);
router.get("/tvseries/:id", tvSeriesController.getTvSeriesById);
router.post("/tvseries", tvSeriesController.addTvSeries);
router.put("/tvseries/:id", tvSeriesController.updateTvSeries);
router.delete("/tvseries/:id", tvSeriesController.deleteTvSeries);

module.exports = router;

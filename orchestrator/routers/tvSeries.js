const router = require("express").Router();
const tvSeriesController = require("../controllers/tvSeries");

router.get("/", tvSeriesController.getAllTvSeries);
router.get("/:id", tvSeriesController.getTvSeriesById);
router.post("/", tvSeriesController.addTvSeries);
router.put("/:id", tvSeriesController.editTvSeries);
router.delete("/:id", tvSeriesController.deleteTvSeries);

module.exports = router;

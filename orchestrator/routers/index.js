const router = require("express").Router();
const moviesRouter = require("./movies");
const tvSeriesRouter = require("./tvSeries");
const entertainMeController = require("../controllers/entertainMe");

router.get("/entertainme", entertainMeController.getAllMoviesAndTvSeries);
router.use("/movies", moviesRouter);
router.use("/tv", tvSeriesRouter);

module.exports = router;

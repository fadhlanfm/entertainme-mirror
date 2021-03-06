const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3002;

const { connect } = require("./config/mongo");

connect((err) => {
  const tvSeriesRouter = require("./routers");
  if (!err) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", tvSeriesRouter);
    app.listen(PORT, () =>
      console.log("listening to tv_series server on port", PORT)
    );
  }
});

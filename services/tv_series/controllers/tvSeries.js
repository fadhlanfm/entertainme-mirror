const tvSeriesModel = require("../models/tvSeries");

class tvSeriesController {
  static async getAllTvSeries(req, res) {
    try {
      const tvSeries = await tvSeriesModel.getAllTvSeries();
      return res.status(200).json(tvSeries);
    } catch (error) {
      console.log(error);
    }
  }

  static async getTvSeriesById(req, res) {
    const { id } = req.params;
    try {
      const tvSeries = await tvSeriesModel.getTvSeriesById(id);
      return res.status(200).json(tvSeries);
    } catch (error) {
      console.log(error);
    }
  }

  static async addTvSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const newTvSeries = { title, overview, poster_path, popularity, tags };
    try {
      const tvSeries = await tvSeriesModel.addTvSeries(newTvSeries);
      return res.status(200).json(tvSeries);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  static async updateTvSeries(req, res) {
    const { id } = req.params;
    let oldData = await tvSeriesModel.getTvSeriesById(id);
    let { title, overview, poster_path, popularity, tags } = req.body;
    if (!title) title = oldData.title;
    if (!overview) overview = oldData.overview;
    if (!poster_path) poster_path = oldData.poster_path;
    if (!popularity) popularity = oldData.popularity;
    if (!tags && oldData.tags.length > 0) tags = oldData.tags.slice();
    const updates = { title, overview, poster_path, popularity, tags };
    try {
      const tvSeries = await tvSeriesModel.updateTvSeries(id, updates);
      return res.status(200).json(tvSeries);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteTvSeries(req, res) {
    const { id } = req.params;
    try {
      const tvSeries = await tvSeriesModel.deleteTvSeries(id);
      return res.status(200).json(tvSeries);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = tvSeriesController;

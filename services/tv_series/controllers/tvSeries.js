const tvSeriesModel = require('../models/tvSeries')

class tvSeriesController {
  static async showTvSeries(req, res) {
    try {
      const tvSeries = await tvSeriesModel.showTvSeries()
      return res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
    }
  }

  static async showOneTvSeries(req, res) {
    const { id } = req.params
    try {
      const tvSeries = await tvSeriesModel.showOneTvSeries(id)
      return res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
    }
  }

  static async addTvSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body
    const newTvSeries = { title, overview, poster_path, popularity, tags }
    try {
      const tvSeries = await tvSeriesModel.addTvSeries(newTvSeries)
      return res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

  static async updateTvSeries(req, res){
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body
    const updates = { title, overview, poster_path, popularity, tags }
    try {
      const tvSeries = await tvSeriesModel.updateTvSeries(id, updates)
      return res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteTvSeries(req, res){
    const { id } = req.params
    try {
      const tvSeries = await tvSeriesModel.deleteTvSeries(id)
      return res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = tvSeriesController
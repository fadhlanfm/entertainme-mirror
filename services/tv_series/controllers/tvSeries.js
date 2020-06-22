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
    try {
      const tvSeries = await tvSeriesModel.showOneTvSeries(req.params.id)
      return res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
    }
  }

  static async addTvSeries(req, res) {
    try {
      const tvSeries = await tvSeriesModel.addTvSeries(req.body)
      return res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

  static async updateTvSeries(req, res){
    try {
      const tvSeries = await tvSeriesModel.updateTvSeries(req.params.id, req.body)
      return res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteTvSeries(req, res){
    try {
      const tvSeries = await tvSeriesModel.deleteTvSeries(req.params.id)
      return res.status(200).json(tvSeries)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = tvSeriesController
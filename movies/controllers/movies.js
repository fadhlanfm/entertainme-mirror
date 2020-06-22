const moviesModel = require('../models/moviesModel')

class moviesController {
  static async showMovies(req, res) {
    try {
      const movies = await moviesModel.showMovies()
      return res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
  }

  static async showOneMovies(req, res) {
    try {
      const movie = await moviesModel.showOneMovie(req.params.movieId)
      return res.status(200).json(movie)
    } catch (error) {
      console.log(error)
    }
  }

  static async addMovie(req, res) {
    try {
      const movie = await moviesModel.addMovie(req.body)
      return res.status(200).json(movie)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

  static async updateMovie(req, res){
    try {
      const movie = await moviesModel.updateMovie(req.params.movieId, req.body)
      return res.status(200).json(movie)
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteMovie(req, res){
    try {
      const movie = await moviesModel.deleteMovie(req.params.movieId)
      return res.status(200).json(movie)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = moviesController
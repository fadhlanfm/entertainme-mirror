const moviesModel = require('../models/movies')

class moviesController {
  static async showMovies(req, res) {
    try {
      const movies = await moviesModel.showMovies()
      return res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
  }

  static async showOneMovie(req, res) {
    const { id } = req.params
    try {
      const movie = await moviesModel.showOneMovie(id)
      return res.status(200).json(movie)
    } catch (error) {
      console.log(error)
    }
  }

  static async addMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body
    const newMovie = { title, overview, poster_path, popularity, tags }
    try {
      const movie = await moviesModel.addMovie(newMovie)
      return res.status(200).json(movie)
    } catch (error) {
      console.log(error)
      return res.status(400).json(error)
    }
  }

  static async updateMovie(req, res){
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body
    const updates = { title, overview, poster_path, popularity, tags }
    try {
      const movie = await moviesModel.updateMovie(id, updates)
      return res.status(200).json(movie)
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteMovie(req, res){
    const { id } = req.params
    try {
      const movie = await moviesModel.deleteMovie(id)
      return res.status(200).json(movie)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = moviesController
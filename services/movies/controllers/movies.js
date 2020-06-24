const moviesModel = require("../models/movies");

class moviesController {
  static async getAllMovies(req, res) {
    try {
      const movies = await moviesModel.getAllMovies();
      return res.status(200).json(movies);
    } catch (error) {
      console.log(error);
    }
  }

  static async getMovieById(req, res) {
    const { id } = req.params;
    try {
      const movie = await moviesModel.getMovieById(id);
      return res.status(200).json(movie);
    } catch (error) {
      console.log(error);
    }
  }

  static async addMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const newMovie = { title, overview, poster_path, popularity, tags };
    try {
      const movie = await moviesModel.addMovie(newMovie);
      return res.status(200).json(movie);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  static async updateMovie(req, res) {
    const { id } = req.params;
    let oldData = await moviesModel.getMovieById(id);
    // console.log("old data", oldData);
    let { title, overview, poster_path, popularity, tags } = req.body;
    if (!title) title = oldData.title;
    if (!overview) overview = oldData.overview;
    if (!poster_path) poster_path = oldData.poster_path;
    if (!popularity) popularity = oldData.popularity;
    if (!tags) tags = oldData.tags.slice();
    const updates = { title, overview, poster_path, popularity, tags };
    // console.log(updates);
    try {
      const movie = await moviesModel.updateMovie(id, updates);
      return res.status(200).json(movie);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteMovie(req, res) {
    const { id } = req.params;
    try {
      const movie = await moviesModel.deleteMovie(id);
      return res.status(200).json(movie);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = moviesController;

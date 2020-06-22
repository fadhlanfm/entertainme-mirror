const router = require('express').Router();
const moviesController = require('../controllers/movies')

router.get('/movies', moviesController.showMovies)
router.get('/movies/:id', moviesController.showOneMovie)
router.post('/movies', moviesController.addMovie)
router.put('/movies/:id', moviesController.updateMovie)
router.delete('/movies/:id', moviesController.deleteMovie)

module.exports = router
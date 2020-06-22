const router = require('express').Router()
const moviesController = require('../controllers/movies')

router.get('/', moviesController.findAll)
router.get('/:id', moviesController.findOne)
router.post('/', moviesController.addMovie)
router.put('/:id', moviesController.editMovie)
router.delete('/:id', moviesController.deleteMovie)

module.exports = router
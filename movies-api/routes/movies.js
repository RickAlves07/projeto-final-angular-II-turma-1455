const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const requireAuth = require('../middleware/authMiddleware');

// Públicas
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

// Protegidas
// router.post('/', requireAuth, movieController.createMovie);
router.post('/', movieController.createMovie);
router.put('/:id', requireAuth, movieController.updateMovie);
router.delete('/:id', requireAuth, movieController.deleteMovie);

module.exports = router;
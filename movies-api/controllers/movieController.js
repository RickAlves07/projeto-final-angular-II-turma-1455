const crypto = require('crypto');
const movieModel = require('../models/movieModel');

const getAllMovies = (req, res) => {
  res.json(movieModel.findAll());
};

const getMovieById = (req, res) => {
  const movie = movieModel.findById(req.params.id);
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
};

const createMovie = (req, res) => {
  const { title, genre, platform, imageLink, price, description, availableInStock } = req.body;
  if (!title || !genre || !platform) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const id = crypto.randomUUID();
  const movie = {
    id, title, genre, platform, imageLink, price, description, availableInStock
  };
  const created = movieModel.create(movie);
  res.status(201).json(created);
};

const updateMovie = (req, res) => {
  const exists = movieModel.findById(req.params.id);
  if (!exists) return res.status(404).json({ error: 'Movie not found' });
  const updated = movieModel.update(req.params.id, req.body || {});
  res.json(updated);
};

const deleteMovie = (req, res) => {
  const removed = movieModel.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Movie not found' });
  res.json({ message: 'Movie deleted successfully' });
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};

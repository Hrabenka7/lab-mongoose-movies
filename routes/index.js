// ##################################### FOURTH PAGE TO START ########################## //

// define constants
const express = require('express');
const router = express.Router(); // creates a "mini-app"
const Movie = require('../models/movie');
const mongoose = require('mongoose');

// redirecting to movies page after writing the page address; just to not confuse the user
router.get('/', (req, res, next) => {
  res.redirect('/movies');
});

// when get /movies, retrive "result" from db and save it as a value (movies-result pair)of data constant
router.get('/movies', (req, res, next) => {
  Movie.find({})
    .then((result) => {
      const data = {
        movies: result
      };
      res.render('index', data); // deliver this data to index.hbs template
    });
});

// when get /movies/:movieID, render movie detail page
router.get('/movies/:movieId', (req, res, next) => {
  // validate mongo ID and send 404 if invalid
  if (!mongoose.Types.ObjectId.isValid(req.params.movieId)) {
    res.status(404);
    res.render('not-found');
    return;
  }
  // else
  Movie.findOne({ _id: req.params.movieId })
    .then((result) => {
      // check if movie exists and send 404 if not
      const data = {
        movie: result
      };
      res.render('movie-detail', data);
    })
    .catch(next);
});

// when get /movies/create-movie, renders create-movie.hbs
router.get('/movies/create-movie', function (req, res, next) {
  res.render('create-movie');
});

// create a new movie and add it to the database
router.post('/movies', (req, res, next) => {
  console.log('req.body');
  const movie = new Movie(req.body);
  movie.save()
    .then(() => {
      res.redirect(`/movies/${movie._id}`);
    });
});

// delete a movie from a database
router.post('/movies/:movieId/delete', (req, res, next) => {
  Movie.remove({ _id: req.params.movieId })
    .then((result) => {
      res.redirect('/');
    });
});
module.exports = router;

// ##################################### THIRD PAGE TO START ########################## //
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */

const movieSchema = new Schema({
  name: {
    type: String
  },
  year: {
    type: Number
  }
});

const Movie = mongoose.model('Movie', movieSchema); // (name, movieSchema, rewritten name of collection) name is automatically pluralized and lowercased.
// Rewritten name change the automatically created name to whatever we want

module.exports = Movie;

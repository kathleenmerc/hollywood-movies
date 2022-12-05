// IMPORT DEPENDENCIES
const mongoose = require('./connection')


// DEFINE MODEL
const { Schema, model } = mongoose


// MOVIE SCHEMA
const movieSchema = new Schema({
    title: { type: String, required: true },
    releaseDate: String,
    length: Number,
    genre: String,
    poster: { type: String, required: true },
    director: { type: String, required: true },
    rating: String,
    watchAgain: Boolean,
    cast: [{ type: String }]
})


// MOVIE MODEL
const Movie = model("Movie", movieSchema)


// EXPORT MODEL
module.exports = Movie
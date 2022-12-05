// IMPORT DEPENDENCIES
const mongoose = require('./connection')

// DEFINE MODEL
const { Schema, model } = mongoose // pulling schema and model from mongoose

// Make user schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

// Make user model
const User = model('User', userSchema)


// EXPORT USER MODEL
module.exports = User
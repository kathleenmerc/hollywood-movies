// IMPORT DEPENDENCIES
require('dotenv').config() // Load ENV variables, this will allow us to use a `.env` file to define environmental variables we can access via the `process.env` object
const mongoose = require('mongoose') // mongoose is an API, it is an Object Document Mapping (ODM) for connecting to and sending queries to a mongo database


// CONNECTION TO DATABASE (MongoDB)
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// ESTABLISH CONNECTION
mongoose.connect(DATABASE_URL, CONFIG)

// CONNECTION STATUS EVENTS (for when connection opens/disconnects/errors)
mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error))


// EXPORT THE CONNECTION
module.exports = mongoose
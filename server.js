// IMPORT DEPENDENCIES
// require('dotenv').config() <commenting out bc it is in models/connections>
const express = require('express') // import express, this is a web framework for create server and writing routes
const app = express()
const morgan = require('morgan') // import morgan, this logs details about requests to our server, mainly to help us debug
const methodOverride = require('method-override') // allows us to swap the method of a request based on a URL query
const path = require('path') // built in node module we use to resolve paths more on this when we use it
const moviesController = require('./controllers/movie')
const userRouter = require('./controllers/user')


// SET UP ENGINE - Create our Express Application Object, Bind Liquid Templating Engine
app.engine('jsx', require('express-react-views').createEngine())
app.set('view engine', 'jsx')


// MIDDLEWARE
app.use(morgan("tiny")) // logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically


// ROUTES
app.use('/movies', moviesController) // send all "/movies" routes to movies router
app.use('/user', userRouter) // send all "/user" routes to user router

app.get("/", (req, res) => {
    // res.send("your server is running... better catch it.");

    res.render("Index.jsx")
})


// SERVER LISTENING
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
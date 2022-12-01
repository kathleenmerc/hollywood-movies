// IMPORT DEPENDENCIES
require('dotenv').config() // Load ENV variables, this will allow us to use a `.env` file to define environmental variables we can access via the `process.env` object
const express = require('express') // import express, this is a web framework for create server and writing routes
const morgan = require('morgan') // import morgan, this logs details about requests to our server, mainly to help us debug
const methodOverride = require('method-override') // allows us to swap the method of a request based on a URL query
const mongoose = require('mongoose') // mongoose is an API, it is an Object Document Mapping (ODM) for connecting to and sending queries to a mongo database
const path = require('path') // built in node module we use to resolve paths more on this when we use it


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


// MODELS
const { Schema, model } = mongoose

// make movie schema
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

// make movie model
const Movie = model("Movie", movieSchema)


// SET UP ENGINE - Create our Express Application Object, Bind Liquid Templating Engine
const app = express()
app.engine('jsx', require('express-react-views').createEngine())
app.set('view engine', 'jsx')


// MIDDLEWARE
app.use(morgan("tiny")) // logging
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({ extended: true })) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically


// ROUTES
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.");
})


// SEED ROUTE
app.get('/movies/seed', (req, res) => {
    const startMovies = [
        {
            title: "Matrix",
            releaseDate: "1999",
            length: 136,
            genre: "Sci-fi",
            poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            director: "Lana, Lily Wasoki",
            rating: "R",
            watchAgain: true,
            cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
        },
        {
            title: "50 First Dates",
            releaseDate: "2004",
            length: 99,
            genre: "Comedy",
            poster: "https://m.media-amazon.com/images/M/MV5BMjAwMzc4MDgxNF5BMl5BanBnXkFtZTYwNjUwMzE3._V1_FMjpg_UX1000_.jpg",
            director: "Peter Segal",
            rating: "PG-13",
            watchAgain: true,
            cast: ["Adam Sandler", "Drew Barrymore", "Rob Schneider"]
        },
        {
            title: "The Dark Knight",
            releaseDate: "2008",
            length: 152,
            genre: "Action/Superhero",
            poster: "https://resizing.flixster.com/WAHXGKleT3QvhqHUlFGIRgcQAjU=/206x305/v2/https://flxt.tmsimg.com/assets/p173378_p_v8_au.jpg",
            director: "Christopher Nolan",
            rating: "PG-13",
            watchAgain: true,
            cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
        }
    ]

    // Delete all movies
    Movie.deleteMany({}).then((data) => {
        // Seed Starter Movies
        Movie.create(startMovies).then((data) => {
            // send created movies as response to confirm creation
            res.json(data)
        })
    })
})


// INDEX ROUTE (async/await Method)
app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.render("movies/Index", { movies });
    } catch (err) {
        res.json({ err })
    }
});


// INDEX ROUTE (.then Method)
// app.get("/movies", (req, res) => {
//     // find all the fruits
//     Movie.find({})
//       // render a template after they are found
//       .then((movies) => {
//         res.render("movies/Index", { movies });
//       })
//       // send error as json if they aren't
//       .catch((error) => {
//         res.json({ error });
//       });
//   });


// INDEX ROUTE (Callback Method)
// app.get("/movies", (req, res) => {
//     Movie.find({}, (err, movies) => {
//       res.render("movies/Index", { movies });
//     });
//   });


// NEW ROUTE
app.get('/movies/new', (req, res) => {
    res.render('movies/new')
})

// DELETE ROUTE
app.delete("/movies/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // delete the fruit
    Movie.findByIdAndRemove(id)
        .then((movie) => {
            // redirect to main page after deleting
            res.redirect("/movies");
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});


// UPDATE ROUTE
app.put('/movies/:id', async (req, res) => {
    const id = req.params.id;
    try {
        req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
        req.body.cast = req.body.cast.split(",")
        await Movie.findByIdAndUpdate(id, req.body)
        res.redirect(`/movies/${id}`)
    } catch (err) {
        console.log(err)
        res.json({ err })
    }
})


// CREATE ROUTE
app.post('/movies', async (req, res) => {
    try {
        req.body.watchAgain = req.body.watchAgain === "on" ? true : false;
        req.body.cast = req.body.cast.split(",")
        const createdMovie = await Movie.create(req.body)
        res.redirect('/movies')
    } catch (err) {
        console.log(err)
        res.json({ err })
    }
})


// EDIT ROUTE
app.get("/movies/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the fruit from the database
    Movie.findById(id)
        .then((movie) => {
            // render Edit page and send fruit data
            res.render("movies/Edit.jsx", { movie });
        })
        // send error as json
        .catch((error) => {
            console.log(error);
            res.json({ error });
        });
});


// SHOW ROUTE
app.get('/movies/:id', async (req, res) => {
    const id = req.params.id
    try {
        const movie = await Movie.findById(id)
        res.render('movies/Show', { movie })
    } catch (err) {
        console.log(err)
        res.json({ err })
    }
})


// SERVER LISTENING
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port ${PORT}`))
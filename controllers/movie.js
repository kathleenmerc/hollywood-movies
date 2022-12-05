// We are using the MVC framework:
// The Model-View-Controller (MVC) framework is an architectural/design pattern that separates an application into three main logical components Model, View, and Controller. Each architectural component is built to handle specific development aspects of an application.

// M: models/connection.js and models/movie.js- handles the getting the database connection and defining the movie model (share of data)
// V: views/movies/- this folder contains all our views/templates for our movies
// C: controllers/movie.js- creates all our routes which pull data from the model and sends them over to the templates



///// ================================================================ /////
///// ================================================================ /////
///// ================================================================ /////
///// ================================================================ /////



// IMPORT DEPENDENCIES
const express = require('express')
const Movie = require('../models/movie')

// CREATE ROUTER
const router = express.Router()

// When refactoring routes to controllers - change all HTTP requests etc to router.get, router.post, router.put, router.delete... and remove '/movies' from all URLs

// ROUTES - Home, Seed, and I.N.D.U.C.E.S

// HOME ROUTE
// router.get("/", (req, res) => {
//     res.send("your server is running... better catch it.");
// })





// INDEX ROUTE (async/await Method)
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.render("movies/Index", { movies });
    } catch (err) {
        res.json({ err })
    }
});


// INDEX ROUTE (.then Method)
// router.get("/", (req, res) => {
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
// router.get("/", (req, res) => {
//     Movie.find({}, (err, movies) => {
//       res.render("movies/Index", { movies });
//     });
//   });


// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('movies/New')
})


// DELETE ROUTE
router.delete("/:id", (req, res) => {
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
router.put('/:id', async (req, res) => {
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
router.post('/', async (req, res) => {
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
router.get("/:id/edit", (req, res) => {
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
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const movie = await Movie.findById(id)
        res.render('movies/Show', { movie })
    } catch (err) {
        console.log(err)
        res.json({ err })
    }
})



// EXPORT THE ROUTER
module.exports = router
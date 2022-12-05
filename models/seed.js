// IMPORT DEPENDENCIES
const mongoose = require('./connection')
const Movie = require('./movie')



// save the connection in a variable
const db = mongoose.connection;



// SEED ROUTE
db.on('open', () => {
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
            // log new movies
            console.log('data', data)
            // send created movies as response to confirm creation
            //res.json(data) <commenting out bc we dont have access to json method anymore>
            db.close()
        })
        .catch((error) => {
            console.log(error)
            db.close()
        })
    })
})

// we do not need to module.exports because we want to run this file on its own
// we added a 'seeds' script in json.package
// to run this seed file, use command: npm run seed
// we do this because we don't want movies/seed accesible to the user
// we also do this so that people cannot externally change our seed route
// so if you go to localhost:8000/movies/seed, the user will get an error
// we only use a seed route during development so we can test our database and functionality
// we do NOT use a seed route during deployment
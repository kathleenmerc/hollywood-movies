// For User Authorization, need to install bcryptjs, express-session, and connect-mongo 
// bcryptjs: a pre-compiled version of bcrypt which we will use to encrypt passwords
// express-session: middleware for creating session cookies
// connect-mongo: plugin that will allow express session to save session data in our mongo database



///// ================================================================ /////
///// ================================================================ /////
///// ================================================================ /////
///// ================================================================ /////



// IMPORT DEPENDENCIES
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')


// CREATE ROUTE
const router = express.Router()


// ROUTES

// The Signup Routes (get => form, post => submit form)
router.get('/signup', (req, res) => {
    res.render('user/Signup.jsx')
})

router.post('/signup', async (req, res) => {
    // res.send('signup')

    // encrypt password
    req.body.password = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    )

    // create new user
    User.create(req.body)
        .then((user) => {
            //redirect to login page
            res.redirect('/user/login')
        })
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})

// The Login Routes (get => form, post => submit form)
router.get('/login', (req, res) => {
    res.render('user/Login.jsx')
})

router.post('/login', (req, res) => {
    // res.send('login')

    // get the data from the request body
    const { username, password } = req.body

    // search for the user
    User.findOne({ username })
        .then(async (user) => {
            // check if user exists
            if (user) {
                // compare the typed password to the actual encryted password
                const result = await bcrypt.compare(password, user.password)

                if (result) {
                    //redirect to page if successful
                    res.redirect('/movies')
                } else {
                    res.json({ error: "password does not match" })
                }

            } else {
                // send error if user doesn't exist
                res.json({ error: "user does not exist" })
            }
        })
        .catch((error) => {
            // send error as json
            console.log(error)
            res.json({ error })
        })
})


// EXPORT ROUTER
module.exports = router
const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../schema/User')
const { isLoggedIn } = require('../middleware')

router.get('/register', (req, res) => {
    res.render('driver-signup')
})

// router.get('/adddummyuser', async (req, res) => {
//     const user = new User({email: 'bob@gmail.com', username: 'bob'})
//     const newUser = await User.register(user, 'pass123word')
//     res.send(newUser)
// })
router.get("/", function (req, res) {
        res.render("index")
    })
router.post("/register", async (req, res) => {
    try{
        
        const {username, email, password,gender,ssize,wsize,shsize,age} = req.body
        const user = new User({email, username, details:{gender,ssize,wsize,shsize,age}})
        const registeredUser = await User.register(user, password)
        // console.log(registeredUser)
        req.login(registeredUser, err => {
            if(err) return next(err)
            
            req.flash("success", "welcome!")
            res.redirect('/home')
        })
    } catch(e) {
        req.flash("error", e.message)
        res.redirect('/register')
    }
})

router.get('/login', (req, res) =>{
    res.render('driver-login')
})

router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) =>{
    req.flash('success', 'welcome back!')
    res.render('chatbot')
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) return next(err)
        
        req.flash('success', 'logged out')
        res.redirect('/login')
    })
})



module.exports = router
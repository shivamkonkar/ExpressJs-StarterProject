const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session');
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const PORT = process.env.PORT || 3000;
const ejs = require('ejs')
const { isLoggedIn } = require('./middleware') 
const app = express()

const newdriver = require("./schema/newdriver")
const User = require("./schema/User")

const userRoutes = require('./routes/userRoutes')
const gptRoutes = require('./routes/gptRoutes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

const sessionConfig = {
    secret: "asecretstring",
    resave: false,
    saveUninitilized: true,
    cookie: {
        httpOnly: true,
        // expires after a week
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

app.use(session(sessionConfig));
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.set('view engine', 'ejs');


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
  });

app.use('/', userRoutes)
app.use('/gpt', gptRoutes)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://shivamkonkar64:VXKz3uJR4kReXtZq@cluster0.qnprsyf.mongodb.net/");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


async function createNewDriver(name, email, phone) {
    const newDriver = new newdriver({
        username: name,
        NewDriverEmail: email,
        NewDriverPhoneNumber: Number(phone)
    })
    await newDriver.save()
    console.log(newDriver)
}


// app.get("/", function (req, res) {
//     res.render("index")
// })

app.get("/driver-signup", function (req, res) {
    res.render("driver-signup")
})

app.get('/home', isLoggedIn, (req, res) => {
    res.render('home')
})

app.get('/card', (req, res) => {
    res.render('card')
})

app.get('/question', (req, res) => {
    res.render('questionaire')
})

app.post("/", function (req, res) {

    let name = req.body.newDriverName
    let email = req.body.newDriverEmail
    let phone = req.body.newDriverPhoneNo
    createNewDriver(name, email, phone)
    // console.log(phone)
    let ALERT = "success"
    res.render("alert", { alert: ALERT })
})


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The app start on http://localhost:${PORT}`);
    })
})
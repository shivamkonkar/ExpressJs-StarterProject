const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;
const ejs = require('ejs')
const app = express()
const newdriver = require("./schema/newdriver")
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs');
app.use(express.static("public"));



const connectDB = async () => {
    try {
      const conn = await mongoose.connect("mongodb+srv://shivamkonkar64:VXKz3uJR4kReXtZq@cluster0.qnprsyf.mongodb.net/");
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
}

connectDB()


async function createNewDriver(name , email, phone){
    const newDriver = new newdriver({
        NewDriverName: name,
        NewDriverEmail: email,
        NewDriverPhoneNumber: Number(phone)
    })
    await newDriver.save()
    console.log(newDriver)
}



app.get("/driver-signup", function(req ,res){
    res.render("driver-signup")
})


app.post("/", function(req, res){

    let name = req.body.newDriverName
    let email = req.body.newDriverEmail
    let phone = req.body.newDriverPhoneNo
    createNewDriver(name,email,phone)
    console.log(phone)
    let ALERT = "success"
    res.render("alert", {alert : ALERT})
})


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The app start on http://localhost:${PORT}`);
    })
})
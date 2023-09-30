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


mongoose.connect("mongodb+srv://shivamkonkar64:VXKz3uJR4kReXtZq@cluster0.qnprsyf.mongodb.net/");



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

app.listen(PORT, function(){
    console.log(`The app start on http://localhost:${PORT}`);
});
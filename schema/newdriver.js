const mongoose = require('mongoose')

const newDriverSchema = new mongoose.Schema({
  NewDriverName: String,
  NewDriverEmail: String,
  NewDriverPhoneNumber: Number
})

module.exports= mongoose.model("newdriver", newDriverSchema)
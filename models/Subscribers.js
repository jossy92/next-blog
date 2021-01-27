const mongoose = require('mongoose')


const SubscriberSchema = new mongoose.Schema({
   
    email:{
        type:String,
        required:true
    }
   
})

module.exports = mongoose.models.Subcribers ||mongoose.model("Subscriber", SubscriberSchema );
const mongoose= require("mongoose");
const proRatingSchema=new mongoose.Schema({   
     userid:String,
     name:String,
     rating:Number
})

module.exports = mongoose.model("prorating", proRatingSchema);
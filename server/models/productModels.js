const mongoose=require("mongoose");
const adminSchema=new mongoose.Schema({
    name:String,
    brand:String,
    description:String,
    price:Number,
    category:String,
    Phone:String,
    subcategory:String,
    images:[String],
    defaultImage:String,
    ratings:{ type: Number, default:0},
    status:{ type: String, default:'normal'},
})
module.exports=mongoose.model("product",adminSchema)
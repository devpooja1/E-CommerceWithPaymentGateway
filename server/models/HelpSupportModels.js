const mongoose= require("mongoose");
const HelpSchema=new mongoose.Schema({ 
    name:String,
    email:String, 
    message:String,
    // userid:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"user"
    // }

})

module.exports = mongoose.model("Help", HelpSchema);
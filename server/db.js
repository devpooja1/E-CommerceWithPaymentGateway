const mongoose=require('mongoose')
module.exports = () => {
 try {
  mongoose.connect(process.env.DBCONN); 
  console.log("DB Connected");
 } catch (error) {
  console.log(error);
  console.log("Could not connect database!");
 }
};
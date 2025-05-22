const express=require('express')
require('dotenv').config();
const app=express();
const path = require('path') 
const bodyParser=require('body-parser')
const cors=require('cors')
const port=process.env.PORT || 8000;
const adminRoute=require("./routes/adminRoutes");
const productRoute=require("./routes/ProductRoutes");
const userRoute=require("./routes/userRoutes");
const paymentRoute=require("./routes/paymentRoute")
const db=require('./db') //used to connect the database with database file
db(); 

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);

app.use("/api/payment/",paymentRoute);


app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})
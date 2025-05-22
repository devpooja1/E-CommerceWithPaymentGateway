const AdminModel = require("../models/adminModels");
const ProductModels=require("../models/productModels")
const customerOrderModel=require("../models/customerOrderModel");
// const helpModels=require("../models/HelpSupportModels")
// const jwt = require("jsonwebtoken");
const AdminLogin = async (req, res) => {
  const { adminid, password } = req.body;

  try {
    const admin = await AdminModel.findOne({ adminid: adminid });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid Admin ID" });
    }

    // Check if password matches
    if (admin.password !== password) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    res.status(200).json({ msg: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
const productSave=async(req, res)=>{  
  const { name,brand,description,price,category,subcategory }=req.body;
//    console.log(req.files)
  const imageUrls = req.files.map(file => file.path);
  const Product= await ProductModels.create({
   name:name,
   brand:brand,
   price:price, 
   description:description, 
   category:category, 
   subcategory:subcategory,
   images:imageUrls,
   defaultImage:imageUrls[0]
})
res.status(200).send("product successfully uploaded")
}


const DisplayProduct=async(req,res)=>{
   try {
       const DisplayProduct=await ProductModels.find();
       res.status(200).send(DisplayProduct)
   } catch (error) {
       console.log(error)
   }
}
const Remove=async(req,res)=>{

console.log(req.body);
res.send("okk")

}
const productMakePrimary=async(req, res)=>{
   const {id} = req.body;
   const Data= await ProductModels.findByIdAndUpdate(id, {status:"primary"} );
   res.status(201).send({msg:"Product Status Succesfully Changed!"});
}

const productMakeNormal=async(req, res)=>{
   const {id} = req.body;
   const Data= await ProductModels.findByIdAndUpdate(id, {status:"normal"} );
   res.status(201).send({msg:"Product Status Succesfully Changed!"});
}

const showCustomerOrder=async(req, res)=>{
   const Order= await customerOrderModel.find();
   res.status(200).send(Order);
}

const displayAllCustomer=async(req, res)=>{
      const Customer= await customerOrderModel.find();
      res.status(200).send(Customer);
}

module.exports = {
  AdminLogin,
  productSave,
  DisplayProduct,
  Remove,
  productMakePrimary,
  productMakeNormal,
  showCustomerOrder,
  displayAllCustomer
}

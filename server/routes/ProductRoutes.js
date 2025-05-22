const express=require("express");
const route=express.Router();
const ProductController=require("../controllers/productController")

route.get("/displayproduct",ProductController.Productdisplay);
route.get("/showfullproduct", ProductController.productAllDisplay);
route.get("/prolist", ProductController.productDisplaybyCat);
// route.post("/productratings", ProductController.productRatingSave);
route.get("/makeup",ProductController.MakeupPro);
route.post('/search_Product',ProductController.Search_Product)
route.get("/fashion",ProductController.Fashion);
route.get("/mobile",ProductController.Mobile);
// route.post("/removedelete",ProductController.RemoveDelete);

module.exports=route;
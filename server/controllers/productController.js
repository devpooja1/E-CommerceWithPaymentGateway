const ProductModels=require("../models/productModels");
const ProductRating = require("../models/proRatingModel");
const Productdisplay=async(req,res)=>{
   
        const data=await ProductModels.find({status:"primary"});
        // console.log(data)
        res.send(data);
    
    
}


const productAllDisplay=async(req, res)=>{
    const {id} = req.query;
    const Product = await ProductModels.findById(id);
    res.send(Product);
}

const productDisplaybyCat=async(req, res)=>{
    const {cate} = req.query;
    const Product = await ProductModels.find({category:cate});
    res.send(Product);
}

// const productRatingSave=async(req, res)=>{
//     const { ratings, name, userid} = req.body;

//     const RateData = await ProductRating.find({userid:userid});
//     console.log(RateData);
//     if (RateData.length!=0)
//     {
//         res.status(401).send({msg:"You have alerady Rated this product"});
//     }
//     else
//     {

//     const rating = await ProductRating.create({
//         userid:userid,
//         name:name,
//         rating:ratings
//       })
//       res.status(200).send(rating);
//     }
//     }


    const MakeupPro=async(req,res)=>{
        const Data=await ProductModels.find({category: 'Makeup'});
        console.log(Data)
        res.send(Data);
    }
    const Fashion=async(req,res)=>{
        const Data=await ProductModels.find({category: 'Fashion'});
        console.log(Data)
        res.send(Data);
    }
    const Mobile=async(req,res)=>{
        const Data=await ProductModels.find({category: 'Electronics'});
        console.log(Data)
        res.send(Data);
    }
    
    const Search_Product = async (req, res) => {
        const { serchProduct } = req.body;
        console.log("Search Query: ", serchProduct);  
        const Data = await ProductModels.find({
          name: { $regex: serchProduct, $options: 'i' },
        });
        console.log("Search Results: ", Data);  
        res.send(Data);
      };

module.exports ={
    Productdisplay,
    productAllDisplay,
    productDisplaybyCat,
    // productRatingSave,
    MakeupPro,
    Fashion,
    Mobile,
    Search_Product
}
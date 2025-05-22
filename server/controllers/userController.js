const UserModel= require("../models/userModel");
const jwt= require("jsonwebtoken");

const userRegister=async(req, res)=>{
    const {name, address, city, contact,  email, password, confirmPassword} = req.body;
    try {
         if (password!=confirmPassword)
         {
            res.status(401).send({msg:"password dose not match"})
         }

         const User = await  UserModel.create({
            name, 
            address, 
            city, 
            contact,  
            email, 
            password
         })
         res.status(200).send({msg:"user successfully registered!"});
    } catch (error) {
         console.log(error);
    }
}

const userLogin=async(req, res)=>{
    const { email, password} = req.body; 
    try {
        const User= await UserModel.findOne({email:email});
         
        if (!User)
        {
            res.status(400).send({msg:"Invalid Email"});
        }

       else if (User.password!=password)
        {
            res.status(400).send({msg:"Invalid Password!"})
        }
   else{
    const token=await  jwt.sign({id:User._id}, process.env.JWT_SECRET, { expiresIn: '7 days'});   
    res.status(200).send({token:token});
   }
    
    } catch (error) {
        console.log(error);
    }
}


const userProfile = async (req, res) => {
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).send({ msg: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
      const User = await UserModel.findById(decoded.id);
  
      if (!User) {
        return res.status(404).send({ msg: "User not found" });
      }
  
      res.status(200).send(User);
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Internal Server Error" });
    }
  };

const userDetailShow=async(req, res)=>{
    const {id} = req.body;
    console.log(req.body);
    const User = await UserModel.findById(id);
    res.status(200).send(User);
}

module.exports={
    userRegister,
    userLogin,
    userProfile,
    userDetailShow
}




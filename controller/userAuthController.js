const User=require('../model/UserModel')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs');

module.exports={
    createUser:async(req,res)=>{
        const emailRegEx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(!emailRegEx.test(req.body.email)){
        return res.status(400).json({message:"Invalid Email"})
     }

     const minPasswordLength=8;
     if(req.body.password.length<minPasswordLength){
        return res.status(400).json({message:"Password must be at least 8 characters long"})
     }

     try{
        const emailExist=await User.findOne({email:req.body.email})
        if(emailExist){
            return res.status(400).json({status:false,message:"Email already exists"})
        }

        const encryptedPassword =await bcrypt.hash(req.body.password,10);

        const newUser=User({
            username:req.body.username,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            userType:"User",
            password:encryptedPassword  
        });

        await newUser.save();
        res.status(201).json({status:true,message:"User created successfully"})
     }catch(error){
        res.status(500).json({status:false,message:error.message})
     }
    },
    logInUser:async(req,res)=>{
        const emailRegEx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegEx.test(req.body.email)){
            return res.status(400).json({status:false,message:'Email is not valid'})

        }
        const minPasswordLength=8;
        if(req.body.password<minPasswordLength){
            return res.status(400).json({status:false,message:'Password should be at least'+minPasswordLength+'characters long'}) 
        }

        try{
            const user=await User.findOne({email:req.body.email})
            if(!user){
                return res.status(400).json({status:false,message:'User not found'})
            }

            if(user&&(await bcrypt.compare(req.body.password,user.password))){
                const userToken=jwt.sign({
                    id:user._id,
                    userType:user.usertype,
                    email:user.email
                },process.env.JWT_SECRET,{expiresIn:"30d"})
                const {password,...others}=user._doc;

                res.status(200).json({...others,userToken})
            }
           
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    }
}

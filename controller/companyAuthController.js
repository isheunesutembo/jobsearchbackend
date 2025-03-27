const Company=require('../model/CompanyModel')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs');

module.exports={
    createCompany:async(req,res)=>{
        const emailRegEx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if(!emailRegEx.test(req.body.email)){
        return res.status(400).json({message:"Invalid Email"})
     }

     const minPasswordLength=8;
     if(req.body.password.length<minPasswordLength){
        return res.status(400).json({message:"Password must be at least 8 characters long"})
     }

     try{
        const emailExist=await Company.findOne({email:req.body.email})
        if(emailExist){
            return res.status(400).json({status:false,message:"Email already exists"})
        }

        const encryptedPassword =await bcrypt.hash(req.body.password,10);

        const newCompany=Company({
            name:req.body.name,
            address:req.body.address,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            password:encryptedPassword  
        });

        await newCompany.save();
        res.status(201).json({status:true,message:"Company  registered successfully"})
     }catch(error){
        res.status(500).json({status:false,message:error.message})
     }
    },
    logInCompany:async(req,res)=>{
        const emailRegEx=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegEx.test(req.body.email)){
            return res.status(400).json({status:false,message:'Email is not valid'})

        }
        const minPasswordLength=8;
        if(req.body.password<minPasswordLength){
            return res.status(400).json({status:false,message:'Password should be at least'+minPasswordLength+'characters long'}) 
        }

        try{
            const company=await Company.findOne({email:req.body.email})
            if(!company){
                return res.status(400).json({status:false,message:'User not found'})
            }

            if(company&&(await bcrypt.compare(req.body.password,company.password))){
                const companyToken=jwt.sign({
                    id:company._id,
                    userType:company.userType,
                    email:company.email
                },process.env.JWT_SECRET,{expiresIn:"30d"})
                const {password,...others}=company._doc;

                res.status(200).json({...others,companyToken})
            }
           
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    }
}

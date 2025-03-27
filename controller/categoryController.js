const Category=require('../model/CategoryModel')

const upload =require("../middleware/categoryupload")

module.exports={
    createCategory:async(req,res)=>{
        upload(req,res,function(error){
            if(error){
                res.status(500).json({status:false,message:error.message})
            }
            const {title}=req.body;
            const path=req.file!=undefined?req.file.path.replace(/\\/g,"/"):"";
            if(!title||!path){
                res.status(400).json({status:false,message:"Please fill all the fields"})
            }
            const newCategory=new Category({
                title:title,
                image:path
            })
            try{
                newCategory.save()
                res.status(201).json({status:true,message:"Category created successfully"})
            }catch(error){
                res.status(500).json({status:false,message:error.message})
            }
        })
    },
    getAllCategories:async(req,res)=>{
        try{
            const categories=await Category.find()
            res.status(200).json({status:true,categories})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    },
    deleteCategory:async(req,res)=>{
        const id=req.params.id;
        try{
            const categories=await Category.findByIdAndDelete(id)
            res.status(200).json({status:true,message:"category deleted successfully}"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    }
}
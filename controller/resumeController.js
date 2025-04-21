const Resume=require('../model/ResumeModel')
const upload=require('../middleware/resume.upload')


module.exports={
    createResume:async(req,res)=>{
        upload(req,res,function(error){
            if(error){
                res.status(500).json({status:false,message:error.message})
            }else{
                const {userId,title}=req.body
                const path=req.file!=undefined?req.file.path.replace(/\\/g,"/"):""
                if(!userId||!path||!title){
                    res.status(400).json({status:false,message:"User ID, title, and file path are required."})
                }

                const newResume=new Resume({
                    userId:req.body.userId,
                    resume:path,
                    title:req.body.title
                })

                try{
     newResume.save()
     res.status(201).json({status:true,message:"Resume created successfully."})
                }catch(error){
  res.status(500).json({status:false,message:error.message})
                }
            }
        })
    },
    getUserResume:async(req,res)=>{
        const id=req.params.id;

        try{
            const resumes=await Resume.find({userId:id})
            res.status(200).json(resumes)
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }


    },

    updateResume:async(req,res)=>{
        const id=req.params.id;

        try{
            const resumes=await Resume.findByIdAndUpdate({id})
            res.status(200).json({message:"Resume updated successfully"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }


    },

    deleteResume:async(req,res)=>{
        const id=req.params.id;

        try{
            const resumes=await Resume.findByIdAndDelete(id)
            res.status(200).json({message:"Resume deleted successfully"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }


    },

}
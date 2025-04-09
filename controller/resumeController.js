const Resume=require('../model/ResumeModel')
const upload=require('../middleware/resumeupload')

module.exports={
    uploadResume:async(res,req)=>{
        upload(req,res,function(error){
            if(error){
                return res.status(500).json({message:error.message})
            }else{
                const {userId,title}=req.body
                const path=req.file!=undefined?req.file.path.replace(/\\/g,"/"):"";

                if(!title||!userId||!path){
                    return res.status(400).json({message:"Please fill all the fields"})

                }
                const newResume=new Resume({
                    userId:userId,
                    resume:path,
                    title:title
                })
                try{
                   newResume.save()
                   res.status(201).json({status:true,message:"Resume created successfully!"})
                }catch(error){
                    return res.status(500).json({message:error.message})
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
            return res.status(500).json({message:error.message})
        }
    },
    updateResume:async(req,res)=>{
        const id=req.params.id;
        try{
            const resume=await Resume.findByIdAndUpdate(id)
            res.status(200).json({message:"Resume updated successfully"})
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    },
    deleteResume:async(req,res)=>{
        const id=req.params.id;

        try{
         const resume=await Resume.findByIdAndDelete(id)
         res.status(200).json({message:"Resume deleted successfully"})
        }catch(error){
            return res.status(500).json({message:error.message})
        }
    }
}
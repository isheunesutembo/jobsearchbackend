const Application =require('../model/ApplicationModel')


module.exports={
    createApplication:async(req,res)=>{

        const {vacancyId,resume,company,userId}=req.body;
        const applicationExist=await Application.findOne({vacancyId:vacancyId})

        if(applicationExist){
            return res.status(400).json({message:"Application already exists"})
        }

        if(!vacancyId || !resume || !company || !userId){
            return res.status(400).json({message:"All fields are required"})
        }
            

        try{
        const newApplication=await new Application(req.body)
        newApplication.save()
        res.status(201).json({message:"Application created successfully"})
        }catch(error){
            return res.status(500).json({message:"Internal server error"})
        }

    },
    getApplicationByVacancyId:async(req,res)=>{
        const id=req.params.id;

        try{
    const application=await Application.find({vacancyId:id}).populate({path:"company",select:"name address logo email phoneNumber"})
    .populate({path:"userId"})
    .populate({path:"resume"})
    .populate({path:"vacancyId"})
    res.status(200).json(application)
        }catch(error){
            return res.status(500).json({message:"Internal server error"})
        }
    },
    getApplicationByUserId:async(req,res)=>{
        const id=req.params.id;

        try{
    const application=await Application.find({userId:id}).populate({path:"company",select:"name address logo email phoneNumber"})
    .populate({path:"userId"})
    .populate({path:"resume"})
    .populate({path:"vacancyId"})
    res.status(200).json(application)
        }catch(error){
            return res.status(500).json({message:"Internal server error"})
        }
    },

 getApplicationByCompanyId:async(req,res)=>{
        const id=req.params.id;

        try{
    const application=await Application.find({company:id}).populate({path:"company",select:"name address logo email phoneNumber"})
    .populate({path:"userId"})
    .populate({path:"resume"})
    .populate({path:"vacancyId"})
    res.status(200).json(application)
        }catch(error){
            return res.status(500).json({message:"Internal server error"})
        }
    },

   deleteUserApplication:async(req,res)=>{ 
    const id=req.params.id;

    const{status}=req.body;
    try{
   const applications=await Application.findByIdAndDelete(id)
   res.status(200).json({message:"Application deleted successfully"})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
   },
   updateApplicationStatus:async(req,res)=>{
    const id=req.params.id;
    const {status}=req.body;

    if(!["Pending","Accepted","Rejected"].includes(status)){
        return res.status(400).json({message:"Invalid status"})
    }

    try{
        const application=await Application.findByIdAndUpdate(id,{status:status},{new:true})
        res.status(200).json({message:"Application status updated successfully"})

        if(!application){
            return res.status(404).json({message:"Application not found"})
        }
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
   }
    
}
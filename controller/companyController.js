const Company =require('../model/CompanyModel')
const upload =require('../middleware/logo.upload')


module.exports={
    getCompanyById:async(req,res)=>{
        try{
            const id=req.params.id;
            const company=await Company.findById(id);
            const {password,__v,createdAt,firstname,lastname,...companyData}=company._doc;
            res.status(200).json({...companyData});
        }catch(error){
         
            res.status(500).json({message:"Internal server error}",error:error.message});
        }
    },
    updateCompany:async(req,res)=>{
       
        const id=req.params.id;
        upload(req,res,async function(error){
            if(error){
                return res.status(500).json({message:"Internal server error",error:error.message});
            }else{
                const path=req.file!=undefined?req.file.path.replace(/\\/g,"/"):""; 
                
                try{
                    const updatedCompany=await Company.findByIdAndUpdate(id,{name:req.body.name,address:req.body.address,phoneNumber:req.body.phoneNumber,logo:path})
                    res.status(200).json({message:"Company updated successfully"});
                }catch(error){
                    res.status(500).json({message:"Internal server error",error:error.message});
                }
            }

        })
    },
    deleteCompany:async(req,res)=>{
        const id=req.params.id;
        try{
            const deletedCompany=await Company.findByIdAndDelete(id);
            if(!deletedCompany){
                return res.status(404).json({message:"Company not found"});
            }
            res.status(200).json({message:"Company deleted successfully"});
        }catch(error){
            res.status(500).json({message:"Internal server error",error:error.message});
        }
    }
}
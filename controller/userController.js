const User =require('../model/UserModel')
const upload =require('../middleware/profile.upload')


module.exports={
    getUserById:async(req,res)=>{
        try{
            const id=req.params.id;
            const user=await User.findById(id);
            const {password,__v,createdAt,firstname,lastname,...userData}=user._doc;
            res.status(200).json({firstname,lastname,...userData});
        }catch(error){
         
            res.status(500).json({message:"Internal server error}",error:error.message});
        }
    },
    updateUser:async(req,res)=>{
        const {username,firstname,lastname}=req.body;
        const id=req.params.id;
        upload(req,res,async function(error){
            if(error){
                return res.status(500).json({message:"Internal server error",error:error.message});
            }else{
                const path=req.file!=undefined?req.file.path.replace(/\\/g,"/"):""; 
                const user=User({firstname:firstname,lastname:lastname,username:username,profileImage:path}); 
                try{
                    const updatedUser=await User.findByIdAndUpdate(id,{user})
                    res.status(200).json({message:"User updated successfully"});
                }catch(error){
                    res.status(500).json({message:"Internal server error",error:error.message});
                }
            }

        })
    },
    deleteUser:async(req,res)=>{
        const id=req.params.id;
        try{
            const deletedUser=await User.findByIdAndDelete(id);
            if(!deletedUser){
                return res.status(404).json({message:"User not found"});
            }
            res.status(200).json({message:"User deleted successfully"});
        }catch(error){
            res.status(500).json({message:"Internal server error",error:error.message});
        }
    }
}
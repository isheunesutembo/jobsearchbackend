const Favourite=require('../model/favourite_model')


module.exports={
    addJobVacancyToFavourite:async(req,res)=>{
        const {vacancyId,userId}=req.body;

        if(!vacancyId||!userId){
            return res.status(400).json({message:"Please provide both vacancyId and userId"});
        }

        try{

            const favourite=new Favourite(req.body)
            const favouriteExist=await Favourite.findOne({vacancyId:req.body.vacancyId});
            if(favouriteExist){
                return res.status(400).json({message:"Job already added to favourite"});
            }
            await favourite.save()
            res.status(201).json({status:true,message:"added to favourites"})
        }catch(error){
            return res.status(500).json({message:"Internal Server Error"});
        }
    },
    getFavourites:async(req,res)=>{
        const id=req.params.id;
        try{
            const favourite=await Favourite.find({userId:id})
            .populate({path:"vacancyId",select:"title description requirements skillTags experience salary benefits"});
            res.status(200).json(favourite)
        }catch(error){
            return res.status(500).json({message:"Internal Server Error"});
        }
    },
    deleteFavourite:async(req,res)=>{
        const id=req.params.id;

        try{
           const favourite=await Favourite.findByIdAndDelete (id);
            res.status(200).json({message:"removed from favourites"})
        }catch(error){
            return res.status(500).json({message:"Internal Server Error"});
        }
    }
}
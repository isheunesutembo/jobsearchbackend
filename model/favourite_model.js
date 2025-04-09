const mongoose =require('mongoose')

const FavouriteSchema =new mongoose.Schema({
    vacancyId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Vacancy"},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"}
},{
    toJSON:{
        transform:function(doc,ret){
            ret.categoryId=ret._id.toString(),
            delete ret._id
            delete ret.__v;
        }
    }
})

module.exports=mongoose.model('Favourite',FavouriteSchema)
const mongoose =require('mongoose')

const ResumeSchema =new mongoose.Schema({
    title:{type:String,required:true},
    resume:{type:String,required:true},
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

module.exports=mongoose.model('Resume',ResumeSchema)
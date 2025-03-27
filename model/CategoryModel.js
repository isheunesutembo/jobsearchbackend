const mongoose =require('mongoose')

const CategorySchema =new mongoose.Schema({
    title:{type:String, required:true,unique:true},
    image:{type:String,required:true},
    
},{
    toJSON:{
        transform:function(doc,ret){
            ret.categoryId=ret._id.toString(),
            delete ret._id
            delete ret.__v;
        }
    }
})

module.exports=mongoose.model('Category',CategorySchema)
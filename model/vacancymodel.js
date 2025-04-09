const mongoose =require('mongoose')

const VacancySchema =new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String},
    requirements:{type:String},
    salary:{type:Number,required:true},
    benefits:{type:String},
    skillTags:{type:Array,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Category"},
    company:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Company"}
    
},{
    toJSON:{
        transform:function(doc,ret){
            ret.vacancyId=ret._id.toString(),
            delete ret._id
            delete ret.__v;
        }
    }
})
VacancySchema.index({title:'text',description:'text'})

module.exports=mongoose.model('Vacancy',VacancySchema)
const mongoose =require('mongoose')

const CompanySchema=new mongoose.Schema({

    name:{type:String ,required:true},
    address:{type:String ,required:true},
    logo:{type:String },
    phoneNumber:{type:String ,required:true},
    siteLink:{type:String },
    email:{type:String ,required:true,unique:true},
    approved:{type:Boolean ,default:false},
    password:{type:String ,required:true},
    userType:{type:String ,default:'HiringCompany',enum:['User','Admin','HiringCompany']},
},{

    toJSON:{
        transform:function(doc,ret){
            ret.companyId=ret._id.toString();
            delete ret._id;
            delete ret.__v;
        },
       
    }
}, {timestamps:true})

module.exports=mongoose.model('Company',CompanySchema)
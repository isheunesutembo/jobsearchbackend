const multer =require('multer')
const path=require('path')

const storage=multer.diskStorage(
    {destination:function(req,file,cb){
        cb(null,'./uploads/resumes')
    },filename:function(req,file,cb){
        cb(null,Date.now()+"_"+file.originalname)
    }}
)

const fileFilter=(req,file,callback)=>{
    const acceptableExt=[".pdf",".doc",".docx"]
    if(!acceptableExt.includes(path.extname(file.originalname))){
        return callback(new Error("Only .pdf , .doc , .docx are accepted"))
    }
    const fileSize=parseInt(req.headers['content-length'])

    if(fileSize>10048576){
        return callback(new Error("file size is too big"))
    }
    callback(null,true)
}

let upload =multer({
    storage:storage,
    fileFilter:fileFilter,
    fileSize:10048576
})

module.exports=upload.single("resume")
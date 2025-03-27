const express = require('express');
const app = express();
const dotenv=require('dotenv')
const userAuthRoute=require('./routes/userAuthRoute')
const companyAuthRoute=require('./routes/companyAuthRoute')
const categoryRoute=require('./routes/categoryRoute')
mongoose=require('mongoose')


dotenv.config()
mongoose.connect(process.env.DB).then(()=>console.log('connected to database'))
.catch((err)=>console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/",userAuthRoute)
app.use("/api/",companyAuthRoute)
app.use("/api/categories",categoryRoute)

app.listen(process.env.PORT||6000,console.log(`app running on port ${process.env.PORT}`));
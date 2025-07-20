const express = require('express');
const app = express();
const dotenv=require('dotenv')
const userAuthRoute=require('./routes/userAuthRoute')
const companyAuthRoute=require('./routes/companyAuthRoute')
const categoryRoute=require('./routes/categoryRoute')
const vacancyRoute=require('./routes/vacancyRoute')
const favouriteRoute=require('./routes/favouriteRoute')
const resumeRoute=require('./routes/resumeRoute')
const applicationRoute=require('./routes/applicationRoute')
const userRoute=require('./routes/userRoute')
const companyRoute=require('./routes/companyRoute')
mongoose=require('mongoose')
dotenv.config()
mongoose.connect("mongodb+srv://isheunesu48:xeNUW1oMF0Rizy6e@cluster0obboard.s3qnw.mongodb.net/",{
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log('connected to database'))
.catch((err)=>console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/",userAuthRoute)
app.use("/api/",companyAuthRoute)
app.use("/api/categories",categoryRoute)
app.use("/api/vacancies",vacancyRoute)
app.use("/api/favourites",favouriteRoute)
app.use("/api/resumes",resumeRoute)
app.use("/api/applications",applicationRoute)
app.use("/api/users",userRoute)
app.use("/api/companies",companyRoute)


app.listen(process.env.PORT||6000,console.log(`app running on port ${process.env.PORT}`));
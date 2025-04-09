const vacancyModel=require('../model/vacancymodel')


module.exports={
    createVacancy:async(req,res)=>{
        const {title,description,category,salary}=req.body;

        if(!title||!description||!category||!salary){
            res.status(400).json({status:true,message:"you have a missing field"})
        }

        try{
            const newVacancy=new vacancyModel(req.body)
            await newVacancy.save()
            res.status(201).json({status:true,message:"vacancy created successfully"})
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }

    },
    searchVacancy:async(req,res)=>{
        const {query}=req.query

        if(!query){
            res.status(400).json({status:true,message:"query parameter is required"})
        }

        try{
            const results=await vacancyModel.find({$text:{$search:query}})
            res.json(results)
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }
    },
    getAllVacancies:async(req,res)=>{
        try{
            const vacancies=await vacancyModel.find()
            .populate({path:"company",select:"name address logo phoneNumber email"})
            .populate({path:"category",select:"image title"})
            res.status(200).json(vacancies)
        }catch(error){
            res.status(500).json({status:false,message:error.message})
        }},
        getVacanciesById:async(req,res)=>{
            const {id}=req.params.id;
            try{
                const vacancy=await vacancyModel.findById(id).
                populate({path:"company",select:"name address logo phoneNumber email"})
                .populate({path:"category",select:"image title"})
                res.status(200).json(vacancy)

            }catch(error){
                res.status(500).json({status:false,message:error.message})
            }
        },
        getVacancyByCategory:async(req,res)=>{
            const id =req.params.id;
            try{
                const vacancies=await vacancyModel.find({category:id})
                .populate({path:"company",select:"name address logo phoneNumber email"})
                .populate({path:"category",select:"image title"})
                res.status(200).json(vacancies)

            }catch(error){
                res.status(500).json({status:false,message:error.message})
            }
        },
        filterVacancy:async(req,res)=>{
            try{
                let{title,minSalary,maxSalary}=req.query;
                let filter={}
                if(title)filter.title=new RegExp(title,"i")
                    if(minSalary||maxSalary){
                        filter.salary= {}
                        if(minSalary)filter.salary.$gte=parseFloat(minSalary)
                            if(maxSalary)filter.salary.$lte=parseFloat(maxSalary)
                    }

                    const vacancies=await vacancyModel.find(filter)
                    res.status(vacancies)

            }catch(error){
                res.status(500).json({status:false,message:error.message})
            }
        }


}
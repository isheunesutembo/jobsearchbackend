const express =require('express')
const rateLimit=require('express-rate-limit')

const appLimiter=rateLimit({
    windowMs:60*60*1000,
    max:300,
    message:'Too many requests, please try again later'
})

const logInLimiter=rateLimit({
    windowMs:60*60*1000,
    max:5,
    message:'Too many login attempts, please try again later'
})

module.exports={
    appLimiter,
    logInLimiter
}
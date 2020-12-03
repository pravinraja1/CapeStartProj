const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/db.config')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }

    const token = authorization.replace("Token ","")

    jwt.verify(token,JWT_KEY,(err,payload)=>{
        if(err){
         return   res.status(401).json({error:err})
        }
        req.userId = payload.id
        next()
    })
    
}



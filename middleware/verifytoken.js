const fs = require('fs');
const jwt=require('jsonwebtoken')
jwtKey='jwt'

    function verifyToken(req,res,next){
        const bearerHeader=req.headers['authorization'];
        if(typeof bearerHeader !=='undefined'){
            const bearer=bearerHeader.split(' ')
            console.log(bearer[1])
            req.token=bearer[1]
            jwt.verify(req.token,jwtKey,(err,authData)=>{
                if(err){
                    res.send("Not verified")
                }
                else{
                    next()
                }
            })
            //res.send("Hello")
        }else{
            res.send({"result":"Token not provided"})
        }
    }
module.exports={
    verifyToken:verifyToken
}
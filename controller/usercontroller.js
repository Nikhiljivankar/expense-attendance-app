const mongoose = require("mongoose");
const shortid  = require("shortid");
const time     = require('./../lib/timeLib');
const response = require('./../lib/responseLib');
const logger   = require('./../lib/loggerLib');
const validateInput = require('./../lib/paramsValidationLib');
const check    = require("./../lib/checkLib");
const fs = require("fs");
const { exec } = require("child_process");
var crypto=require('crypto');
var key="password"
var algo='aes256'
const jwt=require('jsonwebtoken')
jwtKey='jwt'
const newUserModel = mongoose.model('user');

// start employeefunction 
let userFunction = (req, res) => {
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.userEmail) {
                if (!validateInput.Email(req.body.userEmail)) {
                    let apiResponse = response.generate(true, 'Email Does not meet the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.userPassword)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During User Creation', 'userController: createUser()', 5)
                let apiResponse = response.generate(true, 'Main Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createUser = () => {
        return new Promise((resolve, reject) => {
            newUserModel.findOne({ userEmail: req.body.userEmail })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'userController: createUser', 10)
                        let apiResponse = response.generate(true, 'Failed To Create user', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        console.log(req.body)
                        var cipher=crypto.createCipher(algo,key);
                        var encrpypted=cipher.update(req.body.userPassword,'utf8','hex')
                        +cipher.final('hex')
                        let newUser = new newUserModel({
                            userId:             shortid.generate(),
                            name:      req.body.name,
                            userEmail:          req.body.userEmail.toLowerCase(),
                            userName:         req.body.userName,  
                            userPassword:       encrpypted,
                            userNumber :      req.body.userNumber,
                            created:                time.now()
                        })
                        newUser.save((err, newUser) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'userController: createUser', 10)
                                let apiResponse = response.generate(true, 'Failed to create new user', 500, null)
                                reject(apiResponse)
                            } else {
                                let newUserObj = newUser.toObject();
                                resolve(newUserObj)
                            }
                        })
                    } else {
                        logger.error('User Cannot Be Created.User Already Present', 'userController: createUser', 4)
                        let apiResponse = response.generate(true, 'User Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create Employee function
    validateUserInput(req, res)
        .then(createUser)
        .then((resolve) => {
            // delete resolve.password
            let apiResponse = response.generate(false, 'User created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end  Employee function 

/* Get all Eployee Details */
let getAllUser = (req, res) => {
    newUserModel.find()
        .select(' -__v -_id -employeePhoto')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'userController: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No user Found', 'userController: getAllUser')
                let apiResponse = response.generate(true, 'No user Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all Employee


let deleteUser = (req, res) => {
    if(check.isEmpty(req.params.userId)){
        console.log("please enter the userId");
        let apiResponse = response.generate(true, "misiing the userId", 403, null);
        res.send(apiResponse);
    } else {
        newUserModel.findOneAndRemove({ 'userId': req.params.userId }).exec((err, result) => {
                                if (err) {
                                    console.log(err)
                                    logger.error(err.message, 'userController: deleteUser', 10)
                                    let apiResponse = response.generate(true, 'Failed To delete User', 500, null)
                                    res.send(apiResponse)
                                } else if (check.isEmpty(result)) {
                                    logger.info('No User Found', 'userController: deleteUser')
                                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                                    res.send(apiResponse)
                                } else {
                                    let apiResponse = response.generate(false, 'Delete User Successfully', 200, result)
                                    res.send(apiResponse)
                                }
                            });  
                }
                   // end Employee model find and remove
}// end delete Employee

/* Get single Employee details */
let getUserbyid = (req, res) => {
    if(check.isEmpty(req.params.userId)){
        console.log("please enter userId");
        let apiResponse = response.generate(true, "missing userId", 403, null);
        res.send(apiResponse);   
    } else {
        newUserModel.findOne({ 'userId': req.params.userId })
        .select('-userPassword -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'userController: getUserbyid', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No user Found', 'userController:getUserbyid')
                let apiResponse = response.generate(true, 'No user Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
    }
}// end get single employee

let userEdit = (req,res) =>{
    if(check.isEmpty(req.body.userId)){
        console.log("userId is missing");
        let apiResponse = response.generate(true, "missing userId", 403, null);
        res.send(apiResponse);
    } else {
        let options = req.body;
        newUserModel.update({"userId": req.body.userId}, options, {multi:true}).exec((err, result)=>{
            if(err){
                console.log(err);
                logger.error(err.message, "userController: userEdit");
                let apiResponse = response.generate(true,"Failed to the update user", 500, null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                let apiResponse = response.generate(true,"not user details found",404,null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "Update user successFully",200, result);
                res.send(apiResponse);
            }
        })
      
    }
}
let login=(req,res)=>{
    newUserModel.findOne({userEmail:req.body.userEmail}).exec((err,result)=>{
    if(err){
    console.log(err);
                logger.error(err.message, "userController: login");
                let apiResponse = response.generate(true,"Failed to login", 500, null);
                res.send(apiResponse);
            }
            else if(check.isEmpty(result)){
                let apiResponse = response.generate(true,"not user found",404,null);
                res.send(apiResponse);
            }
            else{
       var decipher=crypto.createDecipher(algo,key);
       var decrypted=decipher.update(result.userPassword,'hex','utf8')+
       decipher.final('utf8')
       if(decrypted==req.body.userPassword){
        jwt.sign({result}, jwtKey, { expiresIn: '300s' }, (err, token) => {
            res.json({
            token
            });
        });
    }
    else{
        let apiResponse = response.generate(true,"Please enter userPassword",404,null);
        res.send(apiResponse);
    }
    }
    })
}
/* Get all Eployee Details */
let getusersample = (req, res) => {
    newUserModel.find()
        .select(' -__v -_id -employeePhoto')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'userController: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No user Found', 'userController: getAllUser')
                let apiResponse = response.generate(true, 'No user Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}
// function verifyToken(req,res,next){
//     const bearerHeader=req.headers['authorization'];
//     if(typeof bearerHeader !=='undefined'){
//         const bearer=bearerHeader.split(' ')
//         console.log(bearer[1])
//         req.token=bearer[1]
//         jwt.verify(req.token,jwtKey,(err,authData)=>{
//             if(err){
//                 res.send("Not verified")
//             }
//             else{
//                 next()
//             }
//         })
//         //res.send("Hello")
//     }else{
//         res.send({"result":"Token not provided"})
//     }
// }
// end edit employee
module.exports = {

    userFunction: userFunction,
    getAllUser:getAllUser,
    deleteUser:deleteUser,
    getUserbyid:getUserbyid,
    userEdit:userEdit,
    login:login,
    getusersample:getusersample,
    //verifyToken:verifyToken
}// end exports

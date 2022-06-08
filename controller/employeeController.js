const mongoose = require("mongoose");
const shortid  = require("shortid");
const time     = require('./../lib/timeLib');
const response = require('./../lib/responseLib');
const logger   = require('./../lib/loggerLib');
const validateInput = require('./../lib/paramsValidationLib');
const check    = require("./../lib/checkLib");
const fs = require("fs");
const { exec } = require("child_process");

const employeeModel = mongoose.model('employee');
const attendanceModel = mongoose.model('attendance');

// const attendanceModel = require('../models/attendanceModel');

// start employeefunction 
let employeeFunction = (req, res) => {
    let validateEmployeeInput = () => {
        return new Promise((resolve, reject) => {
            if (req.body.employeeEmail) {
                if (!validateInput.Email(req.body.employeeEmail)) {
                    let apiResponse = response.generate(true, 'Email Does not meet the requirement', 400, null)
                    reject(apiResponse)
                } else if (check.isEmpty(req.body.employeePassword)) {
                    let apiResponse = response.generate(true, '"password" parameter is missing"', 400, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }
            } else {
                logger.error('Field Missing During Employee Creation', 'employeeController: createEmployee()', 5)
                let apiResponse = response.generate(true, 'One or More Parameter(s) is missing', 400, null)
                reject(apiResponse)
            }
        })
    }// end validate user input
    let createEmployee = () => {
        return new Promise((resolve, reject) => {
            employeeModel.findOne({ employeeEmail: req.body.employeeEmail })
                .exec((err, retrievedEmployeeDetails) => {
                    if (err) {
                        logger.error(err.message, 'employeeController: createEmployee', 10)
                        let apiResponse = response.generate(true, 'Failed To Create emplooye', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedEmployeeDetails)) {
                        console.log(req.body)
                        // let image = req.file.path
                        // let buff = fs.readFileSync(image);
                        // let base64data = buff.toString('base64');                    
                        let newEmployee = new employeeModel({
                            employeeId:             shortid.generate(),
                            employeeFirstName:      req.body.employeeFirstName,
                            employeeLastName:       req.body.employeeLastName,
                            employeeSalary:req.body.employeeSalary,
                            employeeCode:req.body.employeeCode,
                            employeeBondPeriod:req.body.employeeBondPeriod,
                            employeeRate:req.body.employeeRate,
                            employeeJoinDate:       req.body.employeeJoinDate,
                            employeeDateOfBirthday: req.body.employeeDateOfBirthday,
                            employeeDegree:         req.body.employeeDegree,
                            employeeAddress:        req.body.employeeAddress,
                            role:                   req.body.role,
                            employeeEmail:          req.body.employeeEmail.toLowerCase(),
                            employeeNumber:         req.body.employeeNumber,  
                            employeePassword:       req.body.employeePassword,
                            employeePhoto:req.body.employeePhoto,
                            employeeResume:req.body.employeeResume,
                            employeeDocs:req.body.employeeDocs,
                            //employeePhoto:          base64data,
                            created:                time.now(),
                            lastDateUpdate:         time.now()
                        })
                        newEmployee.save((err, newEmployee) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'employeeController: createEmployee', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Employee', 500, null)
                                reject(apiResponse)
                            } else {
                                let newEmployeeObj = newEmployee.toObject();
                                resolve(newEmployeeObj)
                            }
                        })
                    } else {
                        logger.error('Employee Cannot Be Created.Employee Already Present', 'employeeController: createEmployee', 4)
                        let apiResponse = response.generate(true, 'Employee Already Present With this Email', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create Employee function
    validateEmployeeInput(req, res)
        .then(createEmployee)
        .then((resolve) => {
            // delete resolve.password
            let apiResponse = response.generate(false, 'Employee created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })

}// end  Employee function 


/* Get all Eployee Details */
let getAllEmployee = (req, res) => {
    employeeModel.find()
        .select(' -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Employee Controller: getAllEmployee', 10)
                let apiResponse = response.generate(true, 'Failed To Find Employee Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No employee Found', 'Employee Controller: getAllEmployee')
                let apiResponse = response.generate(true, 'No Employee Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All employee Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}// end get all Employee


let deleteEmployee =  (req, res) => {
    if(check.isEmpty(req.params.employeeId)){
        console.log("please enter the employeeId");
        let apiResponse = response.generate(true, "misiing the employeeId", 403, null);
        res.send(apiResponse);
    } else {
        employeeModel.findOne({ 'employeeId': req.params.employeeId }).exec( async (err, result) => {
                if (result) {
                    // var employeePhoto = result.employeePhoto;
                    let employeeName = result.employeeFirstName +" "+ result.employeeLastName;
                    let attendance = await attendanceModel.findOne({"employeeName": employeeName});
                    if(attendance){
                        let apiResponse = response.generate(true, 'Employee cant be deleted attendance is present', 404, null)
                        res.send(apiResponse)      
                    }
                    else{  
                        employeeModel.findOneAndRemove({ 'employeeId': req.params.employeeId }).exec((err, result) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'Employee Controller: deleteEmployee', 10)
                                let apiResponse = response.generate(true, 'Failed To delete employee', 500, null)
                                res.send(apiResponse)
                            } else if (check.isEmpty(result)) {
                                logger.info('No employee Found', 'Empoloyee Controller: deleteEmployee')
                                let apiResponse = response.generate(true, 'No Employee Found', 404, null)
                                res.send(apiResponse)
                            } else {
                                let apiResponse = response.generate(false, 'Deleted the Employee successfully', 200, result)
                                res.send(apiResponse)
                            }
                        });
                    } 
            
                } else if (check.isEmpty(result)) {
                    logger.info('No employee Found', 'Empoloyee Controller: deleteEmployee')
                    let apiResponse = response.generate(true, 'No Employee Found', 404, null)
                    res.send(apiResponse)
                    
                } else {
                    let apiResponse = response.generate(false, 'Deleted the Employee successfully', 200, result)
                    res.send(apiResponse)
                }
            });// end Employee model find and remove
    }
    
}// end delete Employee

/* Get single Employee details */
let getSingleEmployee = (req, res) => {
    if(check.isEmpty(req.params.employeeId)){
        console.log("please enter employeeId");
        let apiResponse = response.generate(true, "missing employeeId", 403, null);
        res.send(apiResponse);   
    } else {
    employeeModel.findOne({ 'employeeId': req.params.employeeId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Empoloyee Controller: getSingleEmployee', 10)
                let apiResponse = response.generate(true, 'Failed To Find Employee Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Employee Found', 'Employee Controller:getSingleEmployee')
                let apiResponse = response.generate(true, 'No Employee Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Employee Details Found', 200, result)
                res.send(apiResponse)
            }
        })
    }
}// end get single employee

let editEmployee = (req, res) => {

    if(check.isEmpty(req.body.employeeId)){
            console.log("please enter the employeeId");
            let apiResponse = response.generate(true, "missing the employeeId",403,null);
            res.send(apiResponse);
    
    } else {
    let options = req.body;
    employeeModel.update({ 'employeeId': req.body.employeeId }, options, {multi:true}).exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Employee Controller:editEmployee', 10)
                let apiResponse = response.generate(true, 'Failed To edit Employee details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Employee Found', 'Employee Controller: editEmployee')
                let apiResponse = response.generate(true, 'No Employee Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Employee details edited', 200, result)
                res.send(apiResponse)
            }
            });// end user model update
    }   


}// end edit employee



let getByJoinDateEmployee = (req, res) => {
    if(check.isEmpty(req.params.employeeJoinDate)){
        console.log("please enter employeeJoinDate");
        let apiResponse = response.generate(true, "missing employeeJoinDate", 403, null);
        res.send(apiResponse);   
    } else {
        var employeeJoinDate1 = new Date(req.params.employeeJoinDate)

    employeeModel.findOne({ 'employeeJoinDate': employeeJoinDate1 })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Empoloyee Controller: getDateOfJoinEmployee', 10)
                let apiResponse = response.generate(true, 'Failed To Find Employee Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No getDateOfJoinEmployee Found', 'Employee Controller:getDateOfJoinEmployee')
                let apiResponse = response.generate(true, 'No getDateOfJoinEmployee Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Employee getDateOfJoinEmployee Found', 200, result)
                res.send(apiResponse)
            }
        })
    }
}// end get single employee


let employeeFormToDate = (req,res) =>{
    let startDate =  req.query.startDate;
    let endDate =    req.query.endDate;
    var startDate1 = new Date(startDate)
    var endDate1 = new Date(endDate)
    
    employeeModel.find({"employeeJoinDate":{"$gte": startDate1, "$lte": endDate1 }})
        .select("-__v -_id -employeePhoto")
        .lean()
        .exec((err, result)=>{
            if (err) {
                console.log(err)
                logger.error(err.message, 'Empoloyee Controller: employeJoinDateOfFind', 10)
                let apiResponse = response.generate(true, 'Failed To Find Employee join Date of  Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No employeJoinDateOfFind Found', 'Employee Controller:employeJoinDateOfFind')
                let apiResponse = response.generate(true, 'No employeJoinDateOfFind Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Employee employeJoinDateOfFind Found', 200, result)
                res.send(apiResponse)
            }
        })
}

module.exports = {

    employeeFunction: employeeFunction,
    getAllEmployee:getAllEmployee,
    deleteEmployee:deleteEmployee,
    getSingleEmployee:getSingleEmployee,
    editEmployee:editEmployee,
    getByJoinDateEmployee:getByJoinDateEmployee,
    employeeFormToDate:employeeFormToDate

}// end exports

 // employeeModel.findOneAndRemove({ 'employeeId': req.params.employeeId }).exec((err, result) => {
        //     if (err) {
        //         console.log(err)
        //         logger.error(err.message, 'Employee Controller: deleteEmployee', 10)
        //         let apiResponse = response.generate(true, 'Failed To delete employee', 500, null)
        //         res.send(apiResponse)
        //     } else if (check.isEmpty(result)) {
        //         logger.info('No employee Found', 'Empoloyee Controller: deleteEmployee')
        //         let apiResponse = response.generate(true, 'No Employee Found', 404, null)
        //         res.send(apiResponse)
        //         employeeModel.findOne({"employee": req.params.employeeId}, (err, result) =>{
        //             if(result){
        //                 console.log(result);
        //             } else {
        //                 console.log(err);
        //             }
        //         })
        //     } else {
        //         let apiResponse = response.generate(false, 'Deleted the Employee successfully', 200, result)
        //         res.send(apiResponse)
        //     }
        // });// end Employee model find and remove
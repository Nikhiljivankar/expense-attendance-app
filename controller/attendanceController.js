const  express  = require("express");
const  mongoose = require("mongoose");
const shortid  = require("shortid");
const time     = require('./../lib/timeLib');
const response = require('./../lib/responseLib');
const logger   = require('./../lib/loggerLib');
const check    = require("./../lib/checkLib");


const attendanceModel = mongoose.model('attendance');

let attendanceFunction = (req, res) => {

    let createAttendance = () => {
        return new Promise((resolve, reject) => {
            attendanceModel.findOne({ employeeName: req.body.employeeName, date: req.body.Date })
                .exec((err, retrievedAttendanceDetails) => {
                    if (err) {
                        logger.error(err.message, 'attendance Controller: createAttendance', 10)
                        let apiResponse = response.generate(true, 'Failed To Create Attendance', 500, null)
                        reject(apiResponse)
                    } 
                    else if (check.isEmpty(retrievedAttendanceDetails)) {
                        console.log(req.body)

                        let newAttendance = new attendanceModel({
                            attendanceId:           shortid.generate(),
                            employeeName:           req.body.employeeName,
                            startTime:              req.body.startTime,
                            endTime:                req.body.endTime,
                            Date:                   req.body.Date,
                            attendanceStatus:       req.body.attendanceStatus
                            // created:                time.now(),
                            // lastModified:           time.now()
                            
                        })
                        newAttendance.save((err, newAttendance) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'attendanceController: createAttendance', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Attendance', 500, null)
                                reject(apiResponse)
                            } else {
                                let newAttendanceObj = newAttendance.toObject();
                                resolve(newAttendanceObj)
                            }
                        })
                    } else {
                        logger.error('Attendance Cannot Be Created.EmployeeName Already Present', 'attendanceController: createAttendance', 4)
                        let apiResponse = response.generate(true, "EmployeeName Already Present With this employeeName", 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create Employee function


    createAttendance(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Attendance created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })


}// end  Category function 


let getAllAttendance = (req, res) =>{

    attendanceModel.find()
        .select('-__v -_id') 
        .lean()
        .exec((err, result) =>{
            if(err){
                console.log(err);
                logger.error(err.message,"Attendance Controller: getAllAttendance");
                let apiResponse = response.generate(true,"Failed to expenses Details",500,null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                logger.info("no found Attendance details","Attendance Controller: getAllAttendance");
                let apiResponse = response.generate(true, "No found Attendance details", 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "All Attendance details Found", 200, result);
                res.send(apiResponse);
            }
        })       
}


let getViewByIdAttendance = (req, res) =>{
    if(check.isEmpty(req.params.attendanceId)){
        console.log("attendanceId Shude be passed");
        let apiResponse = response.generate(true, "missing attendanceId", 403, null);
        res.send(apiResponse);
    } else {
        attendanceModel.findOne({"attendanceId": req.params.attendanceId}).exec((err, result)=>{
            if(err) {
                console.log(err);
                logger.error(err.message, "Attendance Controller: getViewByIdAttendance");
                let apiResponse = response.generate(true, "Failed to the AttendanceId By Details", 500, null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                logger.info("no Attendance Found","Attendance Controller:getViewByIdAttendance");
                let apiResponse = response.generate(true, "no Attendance Found", 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "Found attendance details successFully", 200, result);
                res.send(apiResponse);
            }
        })
    }
}

let deleteAttendanceById = (req,res) =>{

        if(check.isEmpty(req.params.attendanceId)){
            console.log("please enter attendance Id");
            let apiResponse = response.generate(true, "please enter the attendance Id", 403, null);
            res.send(apiResponse);
        } else {
            attendanceModel.findOneAndRemove({ 'attendanceId': req.params.attendanceId }).exec((err, result) => {
                if (err) {  
                    console.log(err);
                    logger.error(err.message, "Attendance Controller: deleteAttendance");
                    let apiResponse = response.generate(true,"failde to the Attendance Details", 500, null);
                    res.send(apiResponse);
                } else if (check.isEmpty(result)) {
                    logger.info("No Found Attendance", "Attendance Controller: deleteAttendance");
                    let apiResponse = response.generate(true, "No found expense", 404, null);
                    res.send(apiResponse);
                    res.send(apiResponse);
                } else {
                    let apiResponse = response.generate(false, "delete attendance One recorde..", 200, result);
                    res.send(apiResponse);
                }
            });

        }
}

let editAttendance = (req, res) =>{

        if(check.isEmpty(req.body.attendanceId)){
            console.log("please enter attendance Id");
            let apiResponse = response.generate(true, "missing attendance Id", 403, null);
            res.send(apiResponse);
        } else {
            let optioins = req.body;
            attendanceModel.update({"attendanceId": req.body.attendanceId}, optioins, {multi:true}).exec((err, result) =>{
                if(err){
                    console.log(err);
                    logger.error(err.message, "attendance Controller: editAttendance");
                    let apiResponse = response.generate(true,"Failed to the details", 500, null);
                    res.send(apiResponse);
                } else if(check.isEmpty(result)){
                    let apiResponse = response.generate(true,"not found Attendance details",404,null);
                    res.send(apiResponse);
                } else {
                    let apiResponse = response.generate(false, "Edit to successFully Attendance",200, result);
                    res.send(apiResponse);
                }
            })
        }
}
let getAttendancebyname = (req, res) =>{
        attendanceModel.findOne({"employeeName": req.body.employeeName}).exec((err, resultgetAttendancebyname)=>{
            if(err) {
                console.log(err);
                logger.error(err.message, "Attendance Controller: getViewByIdAttendance");
                let apiResponse = response.generate(true, "Failed", 500, null);
                res.send(apiResponse);
            } else if(check.isEmpty(resultgetAttendancebyname)){
                logger.info("no Attendance Found","Attendance Controller:getViewByIdAttendance");
                let apiResponse = response.generate(true, "No Attendance Found", 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "Found", 200, resultgetAttendancebyname);
                res.send(apiResponse);
            }
        })
    }

module.exports = {
    getAllAttendance:getAllAttendance,
    getViewByIdAttendance:getViewByIdAttendance,
    deleteAttendanceById:deleteAttendanceById,
    attendanceFunction:attendanceFunction,
    editAttendance:editAttendance,
    getAttendancebyname:getAttendancebyname
}


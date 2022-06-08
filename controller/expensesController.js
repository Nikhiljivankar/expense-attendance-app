const exprees  = require('express');
const mongoose = require("mongoose");
const shortid  = require("shortid");
const time     = require('../lib/timeLib');
const response = require('../lib/responseLib');
const logger   = require('../lib/loggerLib');
const check    = require('../lib/checkLib'); 
const moment   = require('moment');
const { invalid } = require('moment');
const expensesModel = mongoose.model('expenses');

let expensesFunction = (req, res) => {
    let createExpenses = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
                        // // let today = Date.now();
                        // let ddate = moment().format(req.body.date,'DD-MM-YYYY')
                        //const ddate = new Date(req.body.date,"<YYYY-mm-dd>")

                        console.log(req.body.date)
                        let newExpenses = new expensesModel({
                            expensesId:             shortid.generate(),
                            party:                  req.body.party,
                            category:               req.body.category,
                            date:                   req.body.date,
                            remark:                 req.body.remark,
                            amount:                 req.body.amount
                        })
                        newExpenses.save((err, newExpenses) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'ExpensesController: createExpenses', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Expenses', 500, null)
                                reject(apiResponse)
                            } else {
                                let newExpensesObj = newExpenses.toObject();
                                resolve(newExpensesObj)
                            }
                        }) 
        })
    }// end create Expenses function
    createExpenses(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Expenses created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
}// end  Employee function 

 let  getAllExpenses = (req,res) =>{
    expensesModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) =>{
            if(err){
                console.log(err);
                logger.error(err.message,"expenses Controller: getAllExpenses");
                let apiResponse = response.generate(true,"Failed to expenses Details",500,null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                logger.info("no found expenses details","expenses Controller: getAllExpense");
                let apiResponse = response.generate(true, "No found expenses details", 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "All Expenses details Found", 200, result);
                res.send(apiResponse);
            }
        })
}

/* Get single Employee details */
let getSingleExpenseViewById =(req, res) => {
    if(check.isEmpty(req.params.expensesId)){
        console.log("please enter expensesId");
        let apiResponse = response.generate(true, "missing expensesId", 403, null);
        res.send(apiResponse);   
    } else {
    expensesModel.findOne({ 'expensesId': req.params.expensesId })
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Expenses Controller: getSingleExpenseViewById', 10)
                let apiResponse = response.generate(true, 'Failed To Find Employee Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Expenses Found', 'Expenses Controller:getSingleExpenseViewById')
                let apiResponse = response.generate(true, 'No Expenses Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Expenses Details Found', 200, result)
                res.send(apiResponse)
            }
        })
    }
}// end get single employee


let getViewCategory = (req, res) =>{
    if(check.isEmpty(req.params.category)){
        console.log("category shude be passed");
        let apiResponse = response.generate(true, "category is missing", 403, null);
        res.send(apiResponse);
    } else {
    expensesModel.findOne({"category": req.params.category}, (err, result)=>{
        if(err){
            console.log(err);
            logger.error(err.message,"Expenses Controller: getViewCategory");
            let apiResponse = response.generate(true, "Failed to category details", 500, null);
            res.send(apiResponse);
        } else if(check.isEmpty(result)){
            logger.info("no found category details", "expense Controller: getViewCategory");
            let apiResponse = response.generate(true, "no found category details", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "category single details found", 200, result);
            res.send(apiResponse);
        }
      })
    }   
}

let getViewDate = (req, res) =>{
    if(check.isEmpty(req.params.date)){
        console.log("date shude be passed");
        let apiResponse = response.generate(true, "date is missing", 403, null);
        res.send(apiResponse);
    } else {
    expensesModel.findOne({"date": req.params.date}, (err, result)=>{
        if(err){
            console.log(err);
            logger.error(err.message,"Expenses Controller: getViewDate");
            let apiResponse = response.generate(true, "Failed to Date details", 500, null);
            res.send(apiResponse);
        } else if(check.isEmpty(result)){
            logger.info("no found Date details", "expense Controller: getViewDate");
            let apiResponse = response.generate(true, "no found Date details", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "Date single details found", 200, result);
            res.send(apiResponse);
        }
      })
    }   
}


let deleteExpenses = (req, res) =>{
    if(check.isEmpty(req.params.expensesId)) {
        console.log("expenseId shude be passed");
        let apiResponse = response.generate(true, "expensesId missing", 403, null);
        res.send(apiResponse)
    } else {
        expensesModel.findOneAndRemove({ 'expensesId': req.params.expensesId }).exec((err, result) => {
            if (err) {  
                console.log(err);
                logger.error(err.message, "Expenses Controller: deleteExpenses");
                let apiResponse = response.generate(true,"failde to the expenses Details", 500, null);
                res.send(apiResponse);
            } else if (check.isEmpty(result)) {
                logger.info("no found expense", "expenses Controller: deleteExpenses");
                let apiResponse = response.generate(true, "no found expense", 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "delete expense One recorde..", 200, result);
                res.send(apiResponse);
            }
        });
      
    }
}

let expensesEdit = (req,res) =>{
    if(check.isEmpty(req.body.expensesId)){
        console.log("expesesId shude be passde");
        let apiResponse = response.generate(true, "missing expensesId", 403, null);
        res.send(apiResponse);
    } else {
        let options = req.body;
        expensesModel.update({"expensesId": req.body.expensesId}, options, {multi:true}).exec((err, result)=>{
            if(err){
                console.log(err);
                logger.error(err.message, "expenses Controller: expensesEdit");
                let apiResponse = response.generate(true,"Failed to the details", 500, null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                let apiResponse = response.generate(true,"not found expenses details",404,null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "Edit to successFully Expenses",200, result);
                res.send(apiResponse);
            }
        })
      
    }
}

let getViewByDateExpense = (req,res) =>{
    if(check.isEmpty(req.params.date)){
        console.log("Date is shude be Passed");
        let apiResponse = response.generate(true, "Date is missing", 403, null);
        res.send(apiResponse);
    }else {
        expensesModel.findOne({"date": req.params.date}).exec((err, result) =>{
            if(err){
                console.log(err);
                logger.error(err.message, "Expenses Controller: getDateExpenses");
                let apiResponse = response.generate(true, "Failed to Find Date details",500,null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                    logger.info("No found Date","Date Controller:getDateExpenses");
                    let apiResponse = response.generate(true, "no found  Date", 404, null);
                    res.send(apiResponse);
            } else {
                    let apiResponse = response.generate(false, "Date Details Found", 200, result);
                    res.send(apiResponse);
            }
        })
     } 
}

let filterbydate=(req,res)=>{
    var fromdate=req.body.fromdate
    var todate=req.body.todate   
    console.log(fromdate)
    console.log(todate)
   if(fromdate==null && todate==null)
   {
    expensesModel.find()
    .select('-__v -_id')
    .lean()
    .exec((err, resultfdate) =>{
        if(resultfdate) {
            let apiResponse = response.generate(false, 'All expenses ', 200, resultfdate)
            res.send(apiResponse)
        }
    })      
   }
   else if(fromdate!=null && todate==null)
   {
    var fromdate1 = new Date(fromdate)
    expensesModel.find({ "date":{"$gte":fromdate1}}, (err, resultfdate) => {
        if (resultfdate) {
            let apiResponse = response.generate(false, 'Found by this range date', 200, resultfdate)
            res.send(apiResponse)
        }else{
            let apiResponse = response.generate(true, 'Not found by this date range', 500, resultfdate)
            res.send(apiResponse)
            }
        })
   }
   else if(todate!=null && fromdate==null)
   {
    var todate1 = new Date(todate)
    expensesModel.find({ "date":{"$lte":todate1}}, (err, resultfdate) => {
        if (resultfdate) {
            let apiResponse = response.generate(false, 'Found by this range date', 200, resultfdate)
            res.send(apiResponse)
        }else{
            let apiResponse = response.generate(true, 'Not found by this date range', 500, resultfdate)
            res.send(apiResponse)
            }
        })
   }
  else{
      
    var fromdate1 = new Date(req.body.fromdate)
    var todate1 = new Date(req.body.todate)
    console.log(Date())
    const db1= expensesModel.find({ "date":{"$gte":fromdate1,"$lte":todate1}}, async(err, resultfdate) => {
        if (resultfdate) {
            await db1;
            let apiResponse = response.generate(false, 'Found by this range date', 200, resultfdate)
            res.send(apiResponse)
        }else{
            let apiResponse = response.generate(true, 'Not found by this date range', 500, resultfdate)
            res.send(apiResponse)
            }
        })
    }
}
module.exports = {
    expensesFunction:expensesFunction,
    getAllExpense:getAllExpenses,
    getSingleExpenseViewById:getSingleExpenseViewById,
    deleteExpenses:deleteExpenses,
    expensesEdit:expensesEdit,
    getViewCategory:getViewCategory,
    getViewDate:getViewDate,
    getViewByDateExpense:getViewByDateExpense,
    filterbydate:filterbydate
    
}
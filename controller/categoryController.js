const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require('./../lib/timeLib');
const response = require('./../lib/responseLib');
const logger = require('./../lib/loggerLib');
const validateInput = require('./../lib/paramsValidationLib')
const check = require('./../lib/checkLib');


const categoryModel = mongoose.model('Category');


let categoryFunction = (req, res) => {

    let createCategory = () => {
        return new Promise((resolve, reject) => {
            categoryModel.findOne({ categoryName: req.body.categoryName })
                .exec((err, retrievedCategoryDetails) => {
                    if (err) {
                        logger.error(err.message, 'categoryController: createCategory', 10)
                        let apiResponse = response.generate(true, 'Failed To Create Category', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedCategoryDetails)) {
                        console.log(req.body)
                        // let today =Date.now();
                        let newCategory = new categoryModel({
                            categoryId:             shortid.generate(),
                            categoryName:           req.body.categoryName,
                            date:                   req.body.date,
                            // created:                time.startTime(),
                            // created:                today,
                            // lastModified:           time.now()
                            
                        })
                        newCategory.save((err, newCategory) => {
                            if (err) {
                                console.log(err)
                                logger.error(err.message, 'categoryController: createCategory', 10)
                                let apiResponse = response.generate(true, 'Failed to create new Category', 500, null)
                                reject(apiResponse)
                            } else {
                                let newCategoryObj = newCategory.toObject();
                                resolve(newCategoryObj)
                            }
                        })
                    } else {
                        logger.error('Category Cannot Be Created.CategoryName Already Present', 'categoryController: createCategory', 4)
                        let apiResponse = response.generate(true, "CategoryName Already Present With this CategoryName", 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }// end create Employee function


    createCategory(req, res)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Category created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        })


}// end  Category function 


let getAllCategory = (req,res) =>{

    categoryModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) =>{
            if(err){
                console.log(err);
                logger.error(err.message, "category controller: getAllcategory");
                let apiResponse = response.generate(true,"Failed to find category details",500,null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)) {
                logger.info("no Category Found","category Controller: getAllCatgeorty");
                let apiResponse = response.generate(true, 'No Catgeory found', 404, null);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "All Category Details Found",200,result);
                res.send(apiResponse);
            }
        })
}

let getSingleCategory = (req,res) =>{
    if(check.isEmpty(req.params.categoryId)){
        console.log("Catgeory is shude be Passed");
        let apiResponse = response.generate(true, "category is missing", 403, null);
        res.send(apiResponse);
    }else {
        categoryModel.findOne({"categoryId": req.params.categoryId}).exec((err, result) =>{
            if(err){
                console.log(err);
                logger.error(err.message, "Catgeory Controller: getSingleCategory");
                let apiResponse = response.generate(true, "Failed to Find category details",500,null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                    logger.info("No Catgeory found","Catgeory Controller:getSingleCatgeory");
                    let apiResponse = response.generate(true, "no found category", 404, null);
                    res.send(apiResponse);
            } else {
                    let apiResponse = response.generate(false, "Catgeory Details Found", 200, result);
                    res.send(apiResponse);
            }
        })
     }
        
}

let getDateCategory = (req,res) =>{
    if(check.isEmpty(req.params.date)){
        console.log("Date is shude be Passed");
        let apiResponse = response.generate(true, "Date is missing", 403, null);
        res.send(apiResponse);
    }else {
        categoryModel.findOne({"date": req.params.date}).exec((err, result) =>{
            if(err){
                console.log(err);
                logger.error(err.message, "Catgeory Controller: getDateCategory");
                let apiResponse = response.generate(true, "Failed to Find Date details",500,null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                    logger.info("No found Date","Date Controller:getDateCategory");
                    let apiResponse = response.generate(true, "no found  Date", 404, null);
                    res.send(apiResponse);
            } else {
                    let apiResponse = response.generate(false, "Date Details Found", 200, result);
                    res.send(apiResponse);
            }
        })
     }
        
}


let deleteCatgeory = (req,res) =>{
    categoryModel.findOneAndRemove({"categoryId": req.params.categoryId}).exec((err,result) =>{
        if(err){
            console.log(err);
            logger.error(err.message,"category controller:deleteCategory");
            let apiResponse = response.generate(true, "Failed to delete Catgeory", 500, null);
            res.send(apiResponse);
        } else if(check.isEmpty(result)){
            logger.info("no category found","Catgeory Controller: deleteCategory");
            let apiResponse = response.generate(true, "no Category Found", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "delete the category succefully", 200, result);
            res.send(apiResponse);
        }
    })
}

let editCategory = (req,res) =>{
    if(check.isEmpty(req.body.categoryId)){
        console.log("category should be pass");
        let apiResponse = response.generate(true, "missing expensesId", 403, null);
        res.send(apiResponse);
    } else {
        let options = req.body;
        categoryModel.update({'categoryId': req.body.categoryId},options, {multi:true}).exec((err, result) =>{
            if(err) {
                console.log(err);
                logger.error(err.message,"Category Controller: editCatgeory");
                let apiResponse = response.generate(true, "Failed to edit Catgeory details", 500, null);
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                logger.info("No Category Found", "Catefory Controller: editCatgeory");
                let apiResponse = response.generate(true, "No Category Found",404, null);
                res.send(apiResponse);
            } else {    
                let apiResponse = response.generate(false,"Catgeory Details edited", 200, result);
                res.send(apiResponse);
                
            }
        })
    }
  

}
module.exports ={
    getAllCategory:getAllCategory,
    getSingleCategory:getSingleCategory,
    deleteCatgeory:deleteCatgeory,
    editCategory:editCategory,
    categoryFunction:categoryFunction,
    getDateCategory:getDateCategory
    
}
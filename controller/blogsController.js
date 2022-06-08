const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../lib/responseLib');
const time     = require('./../lib/timeLib');
const logger = require('./../lib/loggerLib');
const check = require('./../lib/checkLib');
//Importing the model here 
const BlogModel = mongoose.model('Blog');
const CatgeoryModel = mongoose.model('Category');
const BrandModel = mongoose.model("brand");

let getAllBlog = (req, res) => {
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'Blog Controller: getAllBlog', 10);
                let apiResponse = response.generate(true, 'Failed To Find Blog Details', 500, null);
                res.send(apiResponse);
                // res.send(err)
            // } else if (result == undefined || result == null || result == '') {
            } else if(check.isEmpty(result)){
                logger.info("no Blog Found","Blog Controller:getAllblog");
                let apiResponse = response.generate(true, 'No Blog Found', 404, null);
                res.send(apiResponse);
                // console.log('No Blog Found')
                // res.send("No Blog Found")
            } else {
                let apiResponse = response.generate(false, 'All Blog Details Found', 200, result);
                res.send(apiResponse);
                // res.send(result)
            }
        })
}// end get all blogs

let getAllBlogs = (req,res) =>{
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) =>{
            if(err){
                // console.log(err);
                // res.send(err);
                let apiResponse = response.generate(true, "Failed to find blog Details", 500, null);
                res.send(apiResponse);
            } else if(result == undefined || result == null || result == ''){
                // console.log("No Blog Found");
                // res.send("No Blog Found");
                let apiResponse = response.generate(true, "not found Blog", 404, null);
                res.send(apiResponse);
            } else {
                // console.log(result)
                let apiResponse = response.generate(false,"All blog Details Found",200, null);
                res.send(apiResponse);
            }
        })
}

let getAllCategory = (req,res) =>{
    CatgeoryModel.find()
        .select('-__v-_id')
        .lean()
        .exec((err, result) =>{
            if(err){
                console.log(err);
                res.send(err);
            } else if( result == undefined || result == null || result == ''){
                console.log("No found category");
                res.send("No found Category");
            } else {
                console.log(result);
                res.send(result);
            }
        })
}

let getAllBrand = (req,res) =>{
    BrandModel.find()
        .select('-__v-_id')
        .lean()
        .exec((err, result) =>{
            if(err){
                console.log(err);
                res.send(err);
            } else if(result == undefined || result == null || result == ''){
                console.log("no found brand...");
                res.send('no found brand');
            } else {
                console.log(result);
                res.send(result);
            }
        })
}

let viewById = (req, res)=>{
    BlogModel.findOne({'blogId' : req.params.blogId}, (err, result) =>{
        if(err){
            console.log(err);
            res.send(err);
        } else if(result == undefined || result == null || result == ''){
            console.log("Not found Blog");
            res.send("not Found Blog");
        } else {
            console.log(result);
        }
    })
}  

let viewCategoryById = (req,res) =>{
    BlogModel.findOne({"blogId": req.params.blogId}, (err,result) =>{
        if(err) {
            console.log(err);
            res.send(err);
        } else if(result == undefined || result == null || result == ''){
            console.log("no Catgeory Found");
            res.send("no category Found");
        } else {
            console.log(result);
        }
    })
}

let viewByBrand = (req,res) =>{
    BlogModel.findOne({"blogId": req.params.blogId}, (err, result) =>{
        if(err){
            console.log(err);
            res.send(err)
        } else if(result == undefined || result == null || result == '') {
            console.log("not found brand");
            res.send("not found brand");
        } else {
            console.log(result);
        }

    })
}

let deleteBlog  = (req, res) =>{
    BlogModel.remove({'blogId' : req.params.blogId}, (err, result) =>{
        if(err){
            console.log(err);
            res.send(err);
        } else if(result == undefined || result == null || result == ''){
            console.log("Not found Blog");
            res.send("Not found Blog");
        } else {
             console.log(result)
             res.send(result);
        }
    })
}

let deleteProduct = (req,res) =>{
    BlogModel.remove({"blogId": req.params.blogId}, (err, result) =>{
        if(err){
            console.log(err);
            res.send(err);
        } else if(result == undefined || result == null || result == ''){
            console.log("not found product");
            res.send("not found product");
        } else {
            // console.log(result);
            res.send(result);
        }
    })
}

let createBlog = (req,res) =>{
    var today = Date.now();
    let blogId = shortid.generate();

    let InsertBlog = new BlogModel({
        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPulished: true,
        category: req.body.category,
        author: req.body.fullName,
        created:today,
        lastModified: today
    });
    let tags = (req.body.tags !=undefined && req.body.tags !=null && req.body.tags !='')? req.body.tags.split(','):[]
    InsertBlog.tags =tags
    InsertBlog.save((err, result) =>{
        if(err){
            console.log(err);
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    })
}

let categoryAdd = (req,res) =>{
    var today = Date.now();
    var categoryId = shortid.generate();

    let InsertCategory = new CatgeoryModel({
       categoryId:categoryId,
       categoryName: req.body.categoryName,
       created:today,
       lastModified:today 
    });

    InsertCategory.save((err, result) =>{
        if(err){
            console.log(err);
            res.send(result);
        } else {
            console.log(result);
            res.send(result);
        }
    })
}

let editCategory = (req,res) =>{

    let options = req.body;
    console.log(options);

    CatgeoryModel.update({"categoryId": req.params.categoryId}, options, {multi:true}).exec((err, result) =>{
        if(err){
            console.log(err);
            res.send(err);
        } else if(result == undefined || result == null || result == ''){
            console.log("no category found");
            res.send("no categoryId found");
        } else {
            res.send(result);
        }
    })
}

let editBlog = (req, res) => {
    let options = req.body;
    console.log(options);
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            console.log(err)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('No Blog Found')
            res.send("No Blog Found")
        } else {
            res.send(result)

        }
    })
}

let editBrand = (req,res) =>{
    let options = req.body;
    BrandModel.update({"brandId": req.params.brandId},options,{multi:true}).exec((err, result) =>{
        if(err){
            console.log(err);
            res.send(err);
        } else if(result == undefined || result == null || result == ''){
                console.log("no brand found");
                res.send("no brand found");
        } else {
                res.send(result);
                console.log(result);
        }
    })
}

let insertBrand = (req,res) =>{

    let today = Date.now();
    let brandId = shortid.generate();

    let insertBrand = new BrandModel({

        brandId:brandId,
        brandName: req.body.brandName,
        created:today,
        lastModified:today
    });

    insertBrand.save((err, result) =>{
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }
    })
}

module.exports = {
    getAllBlog:getAllBlog,
    getAllBlogs:getAllBlogs,
    getAllCategory:getAllCategory,
    getAllBrand:getAllBrand,
    viewById:viewById,
    viewCategoryById:viewCategoryById,
    viewByBrand:viewByBrand,
    deleteBlog:deleteBlog,
    deleteProduct:deleteProduct,
    createBlog:createBlog,
    categoryAdd:categoryAdd,
    editBlog:editBlog,
    editCategory:editCategory,
    insertBrand:insertBrand,
    editBrand:editBrand
}
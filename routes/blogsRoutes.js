const express = require("express");
const blogsController = require("./../controller/blogsController");
const appConfig = require('./../config/appConfig');

let setRouter = (app) =>{

    let baseUrl = appConfig.apiVersion+'/blog';
    app.get(baseUrl+'/all', blogsController.getAllBlog);
    //app.get(baseUrl+'/allS', blogsController.getAllBlogs);
    app.get(baseUrl+'/catgeoryAll', blogsController.getAllCategory);
    app.get(baseUrl+'/getBrandAll', blogsController.getAllBrand);
    app.get(baseUrl+'/view/:id', blogsController.viewById);
    app.get(baseUrl+'/viewCategoryById/:id', blogsController.viewCategoryById);
    app.get(baseUrl+'/viewByBrand/:id', blogsController.viewByBrand);
    app.delete(baseUrl+'/:id/deleteBlog', blogsController.deleteBlog);
    app.delete(baseUrl+'/:id/deleteproduct', blogsController.deleteProduct);
    app.post(baseUrl+'/createBlog', blogsController.createBlog);
    app.post(baseUrl+'/categoryAdd', blogsController.categoryAdd);
    app.put(baseUrl+'/:blogId/editBlog', blogsController.editBlog);
    app.put(baseUrl+'/:categoryId/editCategory', blogsController.editCategory);
    app.post(baseUrl+'/brandCreated', blogsController.insertBrand);
    app.put(baseUrl+'/:brandId/editBrand', blogsController.editBrand)

}

module.exports ={
    setRouter: setRouter
}
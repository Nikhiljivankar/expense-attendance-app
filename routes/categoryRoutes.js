const express = require("express");
const categoryController = require("./../controller/categoryController");
const appConfing = require("./../config/appConfig");
const swaggerJSDoc=require('swagger-jsdoc')
const app = express();
const swaggerUI=require('swagger-ui-express')
const options = {
    definition:{
      info:{
        title:'Swagger Task API',
        version:'1.0.0',
        description:'',
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }

      },
    },
    apis:['./routes/*.js']
    // apis:['index.js']
  }
let setRouter = (app) =>{
let basetUrl = appConfing.apiVersion+'/category';
const swaggerSpec = swaggerJSDoc(options)
app.use(basetUrl+'/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * definitions:
 *  createdCategory:
 *   type: object
 *   properties:
 *    categoryName:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    date:
 *     type: Date
 *     description: date
 *     example: 'YYYY-MM-DD'  
 *  editCategory:
 *   type: object
 *   properties:
 *    categoryId:
 *     type: string
 *     description: categoryId
 *     example: 'categoryId'  
 *    categoryName:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    date:
 *     type: string
 *     description: date
 *     example: 'MM-DD-YYYY'  
 
 */  

/**
 * @swagger
 * /api/v1/category/getAllCategory:
 *   get:
 *     tags:
 *       - Category
 *     description: Returns all Category
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Category
 */
app.get(basetUrl+'/getAllCategory', categoryController.getAllCategory);

/**
 * @swagger
 * /api/v1/category/{categoryId}/getSingleCategory:
 *   get:
 *     tags:
 *       - Category
 *     description: Returns a single Catgeory
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: categoryId single Details find found
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single category
 */
app.get(basetUrl+'/:categoryId/getSingleCategory', categoryController.getSingleCategory);

/**
* @swagger
 * /api/v1/category/{categoryId}/delete:
 *   put:
 *     tags:
 *       - Category
 *     description: Deletes a single Category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: categoryId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted categoryId
 */
app.put(basetUrl+'/:categoryId/delete', categoryController.deleteCatgeory);

/**
 @swagger     
 *  /api/v1/category/editCategory:  
 *    post:   
 *      tags:    
 *        - Category     
 *      description: Updates a single  Category 
 *      parameters:  
 *        - name: categoryId     
 *          description: categoryId 
 *          in: body     
 *          required: true   
 *          schema:
 *            $ref: '#/definitions/editCategory'
 *      responses:   
 *        200:   
 *          description: Successfully Edit category  
 *        500:   
 *          description: Server error
 * */
app.post(basetUrl+'/editCategory', categoryController.editCategory);

/**
 * @swagger
 * /api/v1/category/createdCategory:
 *   post:
 *     tags:
 *       - Category
 *     description: Creates a new Category
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: categoryId
 *         description: category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createdCategory'
 *     responses:
 *       200:
 *         description: Successfully created
 */
app.post(basetUrl+'/createdCategory',categoryController.categoryFunction);

/**
 * @swagger
 * /api/v1/category/{date}/getDateCategory:
 *   put:
 *     tags:
 *       - Category
 *     description: date wish data Catgeory
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: date
 *         description: found catgeory by date
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single category by date
 */
app.put(basetUrl+'/:date/getDateCategory', categoryController.getDateCategory)
}

module.exports ={
    setRouter:setRouter
}
const express = require("express");
const userController = require("./../controller/usercontroller");
const authtoken=require("./../middleware/verifytoken")
const appConfig           = require("./../config/appConfig");

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
    let baseUrl = appConfig.apiVersion+'/user';
    const swaggerSpec = swaggerJSDoc(options)
    app.use(baseUrl+'/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    /**
 * @swagger
 * definitions:
 *  createuser:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    userEmail:
 *     type: string
 *     description: userEmail
 *     example: 'yash@gmail.com'  
 *    userNumber:
 *     type: string
 *     description: userNumber
 *     example: '9624165122'  
 *    userName:
 *     type: string
 *     description: userName
 *     example: 'userName'  
 *    userPassword:
 *     type: string
 *     description: userPassword
 *     example: 'userPassword'    
 *  userEdit:
 *   type: object
 *   properties:
 *    userId:
 *     type: string
 *     description: userId
 *     example: 'userId'  
 *    name:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    userEmail:
 *     type: string
 *     description: userEmail
 *     example: 'yash@gmail.com'  
 *    userName:
 *     type: string
 *     description: userName
 *     example: 'userName'  
 *    userPassword:
 *     type: string
 *     description: userPassword
 *     example: 'userPassword'
 *  login:
 *   type: object
 *   properties:
 *    userEmail:
 *     type: string
 *     description: userEmail
 *     example: 'userEmail'  
 *    userPassword:
 *     type: string
 *     description: userPassword
 *     example: 'userPassword'  
 */  
    
/**
* @swagger
* /api/v1/user/all:
*   get:
*     tags:
*       - User
*     description: Returns all User
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of user
*/
app.get(baseUrl+'/all', userController.getAllUser);

/**
 * @swagger
 * /api/v1/user/{userId}/viewById:
 *   put:
 *     tags:
 *       - User
 *     description: Returns a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: userId single Details found 
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single user by userId
 */
app.put(baseUrl+'/:userId/viewById', userController.getUserbyid);

/**
 * @swagger
 * /api/v1/user/{userId}/delete:
 *   put:
 *     tags:
 *       - User
 *     description: delete a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: delete a single user bu userid
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: elete a single user bu userid
 */
 app.put(baseUrl+'/delete', userController.deleteUser);

 /**
 @swagger     
 *  /api/v1/user/userEdit:  
 *    post:   
 *      tags:    
 *        - User     
 *      description: Updates a single Expenses 
 *      produces:    
 *        - application/json     
 *      parameters:  
 *        - name: expensesId   
 *          description: category object resources   
 *          in: body     
 *          required: true   
 *          schema:  
 *            $ref: '#/definitions/userEdit'   
 *      responses:   
 *        200:   
 *          description: Successfully Edit Expenses  
 *        500:   
 *          description: Server error
 * */
app.post(baseUrl+'/userEdit', userController.userEdit);

/**
 * @swagger
 * /api/v1/user/create:
 *   post:
 *     tags:
 *       - User
 *     description: Creates a new Expenses
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: expensesId
 *         description: Expenses object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createuser'
 *     responses:
 *       200:
 *         description: Successfully create
 */
app.post(baseUrl+'/create', userController.userFunction);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags:
 *       - Login
 *     description: Creates a new Expenses
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: login
 *         description: Expenses object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/login'
 *     responses:
 *       200:
 *         description: Successfully create
 */
app.post(baseUrl+'/login',userController.login)
app.get(baseUrl+'/sample', authtoken.verifyToken, userController.getusersample);

}
module.exports = {
    setRouter:setRouter
}
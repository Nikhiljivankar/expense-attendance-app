const express = require("express");
const employeeController = require("./../controller/employeeController");
const appConfig = require('./../config/appConfig');
const uploadMulter = require('../middleware/upload');
const validation = require('../middleware/validation');
 
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

	let baseUrl = appConfig.apiVersion+'/employee';
	const swaggerSpec = swaggerJSDoc(options)
	app.use(baseUrl+'/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

 /**
 * @swagger
 * definitions:
 *  createEmployee:
 *   type: object
 *   properties:
 *    employeeFirstName:
 *     type: string
 *     description: First name
 *     example: 'first name'  
 *    employeeLastName:
 *     type: string
 *     description: Last name
 *     example: 'last name'  
 *    employeeSalary:
 *     type: number
 *     description: Salary
 *     example: '25000'  
 *    employeeCode:
 *     type: string
 *     description: employee Code
 *     example: '001'  
 *    employeeBondPeriod:
 *     type: string
 *     description: employee Bond Period
 *     example: '6 month'  
 *    employeeRate:
 *     type: number
 *     description: employee Rate
 *     example: '500'  
 *    employeeJoinDate:
 *     type: Date
 *     description: employeeJoinDate
 *     example: 'YYYY-DD-MM'  
 *    employeeDateOfBirthday:
 *     type: Date
 *     description: employeeDateOfBirthday
 *     example: 'YYYY-DD-MM'  
 *    employeeDegree:
 *     type: string
 *     description: employeeDegree
 *     example: 'employeeDegree'  
 *    employeeAddress:
 *     type: string
 *     description: employeeAddress
 *     example: 'employeeAddress'  
 *    role:
 *     type: string
 *     description: role
 *     example: 'role'  
 *    employeeEmail:
 *     type: string
 *     description: employeeEmail
 *     example: 'yash1@gmail.com'  
 *    employeePassword:
 *     type: string
 *     description: employeePassword
 *     example: '12345678'  
 *    employeeNumber:
 *     type: number
 *     description: employeeNumber
 *     example: '0123456789'  
 *    employeePhoto:
 *     type: string
 *     description: employeePhoto
 *     example: 'base 64 string'  
 *    employeeResume:
 *     type: string
 *     description: employeeResume
 *     example: 'base 64 string'  
 *    employeeDocs:
 *     type: string
 *     description: employeeDocs
 *     example: 'base 64 string'  
 *  editEmployee:
 *   type: object
 *   properties:
 *    employeeId:
 *     type: string
 *     description: employeeId
 *     example: 'employeeId'  
 *    employeeFirstName:
 *     type: string
 *     description: First name
 *     example: 'first name'  
 *    employeeLastName:
 *     type: string
 *     description: Last name
 *     example: 'last name'  
 *    employeeSalary:
 *     type: number
 *     description: Salary
 *     example: '25000'  
 *    employeeCode:
 *     type: string
 *     description: employee Code
 *     example: '001'  
 *    employeeBondPeriod:
 *     type: string
 *     description: employee Bond Period
 *     example: '6 month'  
 *    employeeRate:
 *     type: number
 *     description: employee Rate
 *     example: '500'  
 *    employeeJoinDate:
 *     type: string
 *     description: employeeJoinDate
 *     example: 'DD-MM-YYYY'  
 *    employeeDateOfBirthday:
 *     type: string
 *     description: employeeDateOfBirthday
 *     example: 'DD-MM-YYYY'  
 *    employeeDegree:
 *     type: string
 *     description: employeeDegree
 *     example: 'employeeDegree'  
 *    employeeAddress:
 *     type: string
 *     description: employeeAddress
 *     example: 'employeeAddress'  
 *    role:
 *     type: string
 *     description: role
 *     example: 'role'  
 *    employeeEmail:
 *     type: string
 *     description: employeeEmail
 *     example: 'yash1@gmail.com'  
 *    employeePassword:
 *     type: string
 *     description: employeePassword
 *     example: '12345678'  
 *    employeeNumber:
 *     type: number
 *     description: employeeNumber
 *     example: '0123456789'  
 *    employeePhoto:
 *     type: string
 *     description: employeePhoto
 *     example: 'base 64 string'  
 *    employeeResume:
 *     type: string
 *     description: employeeResume
 *     example: 'base 64 string'  
 *    employeeDocs:
 *     type: string
 *     description: employeeDocs
 *     example: 'base 64 string'  
 */  

/**
 * @swagger
 * /api/v1/employee/getAllEmployee:
 *   get:
 *     tags:
 *       - Employee
 *     description: Returns all Employee
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Employee
 */
app.get(baseUrl+'/getAllEmployee', employeeController.getAllEmployee);

/**
 * @swagger
 * /api/v1/employee/{employeeJoinDate}/getByJoinDateEmployee:
 *   put:
 *     tags:
 *       - Employee
 *     description: Returns a single Employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employeeJoinDate
 *         description: employeeJoinDate
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Employee
 *         schema:
 */
app.put(baseUrl+'/:employeeJoinDate/getByJoinDateEmployee', employeeController.getByJoinDateEmployee);

/**
 * @swagger
 * /api/v1/employee/createEmployee:
 *   post:
 *     tags:
 *       - Employee
 *     description: Creates a new employee
 *     parameters:
 *       - name: employeeName
 *         description: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createEmployee'
 *     responses:
 *       200:
 *         description: Successfully created
 */
app.post(baseUrl+'/createEmployee', employeeController.employeeFunction);

/**
 * @swagger
 * /api/v1/employee/{employeeId}/delete:
 *   put:
 *     tags:
 *       - Employee
 *     description: Deletes a single Employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employeeId
 *         description: employeeId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully employee deleted
 */
app.put(baseUrl+'/:employeeId/delete', employeeController.deleteEmployee);

/**
 * @swagger
 * /api/v1/employee/{employeeId}/details:
 *   put:
 *     tags:
 *       - Employee
 *     description: Returns a single Employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employeeId
 *         description: employeeId single Details find found
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Employee
 *         schema:
 *           $ref: '#/definitions/:employeeId/EmployeeId'
 */
app.put(baseUrl+'/:employeeId/details',  employeeController.getSingleEmployee);

/**
 * @swagger
 * /api/v1/employee/edit:
 *   post:
 *     tags:
 *       - Employee
 *     description: Edit a employee
 *     parameters:
 *       - name: employeeName
 *         description: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/editEmployee'
 *     responses:
 *       200:
 *         description: Successfully created
 */
app.post(baseUrl+"/edit", employeeController.editEmployee);

// /**
//  @swagger     
//  *  /api/v1/employee/employeeFormToDate:  
//  *    get:   
//  *      tags:    
//  *        - Employee     
//  *      description: EmployeeDate Of Join All Detail Find 
//  *      produces:    
//  *        - application/json     
//  *      parameters:  
//  *        - name: employeeJoinDate     
//  *          description: employee Object Of All Data Range form  
//  *          in: path     
//  *          required: true   
//  *      responses:   
//  *        200:   
//  *          description: Successfully Edit Employee  
//  *        500:   
//  *          description: Server error
//  * */
// app.get(baseUrl+"/employeeFormToDate", employeeController.employeeFormToDate);
}
module.exports ={
    setRouter: setRouter
}
const express = require("express");
const expensesControllerl = require("./../controller/expensesController");
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
    let baseUrl = appConfig.apiVersion+'/expenses';
    const swaggerSpec = swaggerJSDoc(options)
    app.use(baseUrl+'/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
/**
 * @swagger
 * definitions:
 *  createexpenses:
 *   type: object
 *   properties:
 *    category:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    date:
 *     type: string
 *     description: date
 *     example: 'MM-DD-YYYY'  
 *    remark:
 *     type: string
 *     description: remark
 *     example: 'remark'  
 *    amount:
 *     type: string
 *     description: amount
 *     example: 'amount'    
 *    party:
 *     type: string
 *     description: party name
 *     example: 'party name'    
 *  filterbydate:
 *   type: object
 *   properties:
 *    fromdate:
 *     type: string
 *     description: YYYY-MM-DD fromdate
 *     example: '2021-12-01'  
 *    todate:
 *     type: string
 *     description: YYYY-MM-DD todate
 *     example: '2021-12-01'  
 *  expensesEdit:
 *   type: object
 *   properties:
 *    expensesId:
 *     type: string
 *     description: expensesId to update
 *     example: 'expensesId to update'  
 *    category:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    date:
 *     type: string
 *     description: date
 *     example: 'MM-DD-YYYY'  
 *    remark:
 *     type: string
 *     description: remark
 *     example: 'remark'  
 *    amount:
 *     type: string
 *     description: amount
 *     example: 'amount'    
 *    party:
 *     type: string
 *     description: party name
 *     example: 'party name'    
*/  
    
/**
* @swagger
* /api/v1/expenses/all:
*   get:
*     tags:
*       - Expenses
*     description: Returns all Category
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of Expenses
*/
app.get(baseUrl+'/all', expensesControllerl.getAllExpense);

/**
 * @swagger
 * /api/v1/expenses/{expensesId}/viewById:
 *   put:
 *     tags:
 *       - Expenses
 *     description: Returns a single Expenses
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: expensesId
 *         description: expensesId single Details find 
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Expenses by expensesId
 */
app.put(baseUrl+'/:expensesId/viewById', expensesControllerl.getSingleExpenseViewById);

/**
 * @swagger
 * /api/v1/expenses/{expensesId}/delete:
 *   put:
 *     tags:
 *       - Expenses
 *     description: Deletes a single Expenses
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: expensesId
 *         description: expensesId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully Expenses deleted
 */
 app.put(baseUrl+'/:expensesId/delete', expensesControllerl.deleteExpenses);

 /**
 @swagger     
 *  /api/v1/expenses/{expensesId}/expensesEdit:  
 *    post:   
 *      tags:    
 *        - Expenses     
 *      description: Updates a single Expenses 
 *      produces:    
 *        - application/json     
 *      parameters:  
 *        - name: expensesId   
 *          description: category object resources   
 *          in: body     
 *          required: true   
 *          schema:  
 *            $ref: '#/definitions/expensesEdit'   
 *      responses:   
 *        200:   
 *          description: Successfully Edit Expenses  
 *        500:   
 *          description: Server error
 * */
app.post(baseUrl+'/expensesEdit', expensesControllerl.expensesEdit);

/**
 * @swagger
 * /api/v1/expenses/create:
 *   post:
 *     tags:
 *       - Expenses
 *     description: Creates a new Expenses
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: expensesId
 *         description: Expenses object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createexpenses'
 *     responses:
 *       200:
 *         description: Successfully create
 */
app.post(baseUrl+'/create', expensesControllerl.expensesFunction);

/**
 * @swagger
 * /api/v1/expenses/getViewCategory/{category}:
 *   put:
 *     tags:
 *       - Expenses
 *     description: Returns a single Expenses CategoryWish Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: category
 *         description: category single Details find 
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Expenses
 *         schema:
 *           $ref: '#/definitions/getViewCategory/:category'
 */
app.put(baseUrl+'/getViewCategory/:category', expensesControllerl.getViewCategory);

/**
 * @swagger
 * /api/v1/expenses/getViewDate/{date}:
 *   put:
 *     tags:
 *       - Expenses
 *     description: Returns a single Expenses dateWish Details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: date
 *         description: Date single Details find 
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Expenses
 *         schema:
 *           $ref: '#/definitions/getViewDate/:date'
 */
app.put(baseUrl+'/getViewDate/:date', expensesControllerl.getViewDate);

// /**
//  @swagger     
//  *  /api/v1/expenses/{date}/getViewByDateExpense:  
//  *    put:   
//  *      tags:    
//  *        - Expenses     
//  *      description:  Expenses Of Join All Detail Find 
//  *      produces:    
//  *        - application/json     
//  *      parameters:  
//  *        - name: date     
//  *          description: expeses Object Of All Data Range form  
//  *          in: path     
//  *          required: true   
//  *      responses:   
//  *        200:   
//  *          description: Successfully Edit expeses  
//  *        500:   
//  *          description: Server error
//  * */
// app.put(baseUrl+'/:date/getViewByDateExpense', expensesControllerl.getViewByDateExpense)


/**
 * @swagger
 * /api/v1/expenses/filterbydate:
 *   post:
 *     tags:
 *       - Expenses
 *     description: Expenses filter by date
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: date
 *         description: Expenses filter by date
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/filterbydate'
 *     responses:
 *       200:
 *         description: Successfully create
 */
app.post(baseUrl+'/filterbydate',expensesControllerl.filterbydate)
} 
module.exports = {
    setRouter:setRouter
}
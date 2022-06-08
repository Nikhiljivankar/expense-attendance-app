const express   = require('express');
const attendanceController = require("./../controller/attendanceController");
const appConfig = require("./../config/appConfig");
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

    let baseUrl = appConfig.apiVersion+'/attendance';
    const swaggerSpec = swaggerJSDoc(options)
    app.use(baseUrl+'/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * definitions:
 *  createattendance:
 *   type: object
 *   properties:
 *    employeeName:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    startTime:
 *     type: string
 *     description: startTime
 *     example: '12:12 PM'  
 *    endTime:
 *     type: string
 *     description: endTime
 *     example: '12:12 PM'  
 *    date:
 *     type: Date
 *     description: Date
 *     example: 'YYYY-MM-DD'  
 *    attendanceStatus:
 *     type: string
 *     description: attendanceStatus
 *     example: 'absent/present'  
 *  getAttendancebyname:
 *   type: object
 *   properties:
 *    employeeName:
 *     type: string
 *     description: name
 *     example: 'name'  
 *  editAttendance:
 *   type: object
 *   properties:
 *    attendanceId:
 *     type: string
 *     description: attendanceId
 *     example: 'attendanceId'  
 *    employeeName:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    startTime:
 *     type: string
 *     description: startTime
 *     example: '12:12 PM'  
 *    endTime:
 *     type: string
 *     description: endTime
 *     example: '12:12 PM'  
 *    Date:
 *     type: Date
 *     description: Date
 *     example: 'YYYY-MM-DD' 
 *    attendanceStatus:
 *     type: string
 *     description: attendanceStatus
 *     example: 'absent/present'  
 */  
    
/**
* @swagger
* /api/v1/attendance/all:
*   get:
*     tags:
*       - Attendance
*     description: Returns all Attendance
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of attendance
*/
app.get(baseUrl+'/all', attendanceController.getAllAttendance);

/**
* @swagger
* /api/v1/attendance/viewById/{attendanceId}:
*   put:
*     tags:
*       - Attendance
*     description: Returns a single attendance
*     produces:
*       - application/json
*     parameters:
*       - name: attendanceId
*         description: attendanceId
*         in: path
*         required: true
*         type: string
*     responses:
*       200:
*         description: A array of single attendance
*/
app.put(baseUrl+'/viewById/:attendanceId', attendanceController.getViewByIdAttendance);

/**
 * @swagger
 * /api/v1/attendance/{attendanceId}/deleteAttendanceById:
 *   put:
 *     tags:
 *       - Attendance
 *     description: Deletes a single attendance
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: attendanceId
 *         description: attendanceId 
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: attendance deleted successfully 
 */
app.put(baseUrl+'/:attendanceId/deleteAttendanceById' , attendanceController.deleteAttendanceById);

/**
 * @swagger
 * /api/v1/attendance/create:
 *   post:
 *     tags:
 *       - Attendance
 *     description: Creates a new Attendance
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: attendance object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createattendance'
 *     responses:
 *       200:
 *         description: Successfully create
 */
app.post(baseUrl+'/create', attendanceController.attendanceFunction);

/**
 * @swagger
 * /api/v1/attendance/getAttendancebyname:
 *   post:
 *     tags:
 *       - Attendance
 *     description: get Attendance by name
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: attendance object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/getAttendancebyname'
 *     responses:
 *       200:
 *         description: Successfully create
 */
app.post(baseUrl+'/getAttendancebyname',attendanceController.getAttendancebyname)

/**
 * @swagger
 * /api/v1/attendance/editAttendance:
 *   post:
 *     tags:
 *       - Attendance
 *     description: Edit a Attendance
 *     parameters:
 *       - name: attendanceId
 *         description: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/editAttendance'
 *     responses:
 *       200:
 *         description: Successfully created
 */
app.post(baseUrl+'/editAttendance' , attendanceController.editAttendance);
}

module.exports ={
    setRouter:setRouter
}
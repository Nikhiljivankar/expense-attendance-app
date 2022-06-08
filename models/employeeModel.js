const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Schema = mongoose.Schema,autoIncrement = require('mongoose-auto-increment');
// autoIncrement.initialize(mongoose.connection);
const moment = require('moment');
// mongoose.pluralize(null);
const time = require("./../lib/timeLib");

let emplyeeSchema = new Schema({

        employeeId:{
            type:String,
            unique:true
        },
        employeeFirstName:{
            type:String,
        },
        employeeLastName:{
            type:String,
        },
        employeeSalary:{
            type:Number,
        },
        employeeCode:{
            type:String,
        },
        employeeBondPeriod:{
            type:String,
        },
        employeeRate:{
            type:Number,
        },
        employeeJoinDate:{
            type:Date,
            //default: moment().format('DD-MM-YYYY')
        },
        employeeDateOfBirthday:{
            type:Date,
            //default: moment().format('DD-MM-YYYY')
        },
        employeeDegree:{
            type:String,
        },
        employeeAddress:{
            type:String,
        },
        role:{
            type:String,
        },
        employeeEmail:{
            type:String,
        },
        employeePassword:{
            type: String,
            required:true,
        },
        employeeNumber:{
            type:Number,
        },
        employeePhoto:{
            type:String,
        },
        employeeResume:{
            type:String,
        },
        employeeDocs:{
            type:String,
        },
        created:{
            type:Date,
            default:Date.now
        },
        lastDateUpdate:{
            type:Date,
            default:Date.now
        }
})

mongoose.model('employee', emplyeeSchema);
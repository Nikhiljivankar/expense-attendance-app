const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const moment   = require('moment');

let attendanceSchema = new Schema({

    attendanceId:{
        type:String,
        unique: true
    },
    employeeName:{
        type:String,
        default:''   
    },
    startTime:{
        type:String,
        // default:Date.now,
        default:moment().format("LT")
    },
    endTime:{
        type:String,
        default:moment().format("LT")
    },
    Date:{
        type:Date,
        // default:Date.now
        //default:moment().format("MM-DD-YYYY")
    },
    attendanceStatus:{
        type:String,
        default:"absent"
        },
    created:{
        type:Date,
        default:Date.now
    },
    lastmodefied:{
        type:Date,
        default:Date.now
    }
})
mongoose.model('attendance', attendanceSchema);
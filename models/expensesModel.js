const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const moment   = require('moment');
const expensesSchema = new Schema({

        expensesId:{
            type:String,
            unique:true
        },
        party:
        {
            type:String
        },
        category:{
            type:String,
            default:'' 
        },
        date:{
            type:Date,
        },
        remark:{
            type:String,
         },
        amount:{
            type:Number,
         },
        created:{
            type:Date,
            default:Date.now
        },
        lastModefired:{
            type:Date,
            default:Date.now          
        }
})
mongoose.model('expenses',expensesSchema);
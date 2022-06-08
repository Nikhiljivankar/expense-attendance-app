const mongoose  = require("mongoose");

const Schema = mongoose.Schema;
const moment = require('moment');

let categorySchema = new Schema({

        categoryId:{
            type:String,
            unique:true
        },
        categoryName:{
            type:String,
            default:''
        },
        date:{
            type:Date,
            //default: moment().format('MM-DD-YYYY')
        },
        created:{
            type:String, 
            default: moment().format('MM-DD-YYYY')
            
        },
        lastModified:{
            type:String,
            default: moment().format('MM-DD-YYYY')
        }

})
mongoose.model('Category',categorySchema);
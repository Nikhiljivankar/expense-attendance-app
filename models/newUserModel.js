const mongoose  = require("mongoose");

const Schema = mongoose.Schema;
const moment = require('moment');

let userSchema = new Schema({
        userId:{
            type:String,
            unique:true
        },
        name:{
            type:String,
        },
        userEmail:{
            type:String,
        },
        userNumber:{
            type:Number
        },
        userName:{
            type:String,
          
            default:''
        },
        userPassword:{
            type:String,
            default:''
        },
        created:{
            type:Date,
            default:Date.now 
        }
})
mongoose.model('user',userSchema);
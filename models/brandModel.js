const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let BrandSchema = new Schema({

    brandId:{
        type:String,
        unique:true
    },
    brandName:{
        type:String,
        default:''
    },
    created:{
        type:Date,
        default:Date.now
    },
    lastModified:{
        type:Date,
        default:Date.now
    }

})

mongoose.model('brand',BrandSchema);
const express = require("express");
const appConfig = require('./config/appConfig');
const fs = require("fs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const  multer  = require('multer');

const globalErrorMiddlerware = require("./middleware/appErrorHanddler");
const routeLoggerMiddleware = require('./middleware/routeLogger');

const app = express();
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use(globalErrorMiddlerware.globalErrorHanddler);
app.use(routeLoggerMiddleware.logIp);
app.use(cors());

// Bootstrap models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log(modelsPath+'/'+file)
        require(modelsPath + '/' + file)
    }
  })
  // end Bootstrap models

// Bootstrap route
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log("including the following file");
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route

app.use(globalErrorMiddlerware.globalNotFoundHanddler);

app.listen(appConfig.port, () =>{
    console.log("app running on port 4848");
    let db = mongoose.connect(appConfig.db.uri, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
    // console.log("db conncetion check",db);   
});

mongoose.connection.on('error', function(err){
    console.log("Database connection Error");
    console.log(err);
})

mongoose.connection.on('open', function(err){
    if(err){
        console.log("Database Error");
        console.log(err);
    } else {
        console.log("Database Connection open success");
    }
})
// app.listen(3000, () =>{
//     console.log("hello");
// });
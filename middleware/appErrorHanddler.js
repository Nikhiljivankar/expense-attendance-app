const response = require("./../lib/responseLib");
let errorHandler = (err,req,res,next) =>{
    console.log("Application Error Handdler Called");
    console.log(err);
    // res.send("Some Error Occured At Global Level");
    let apiResponse = response.generate(true,'Some error occured at global level',500,null);
    res.send(apiResponse);
}

let notFoundHandler = (req,res,next) =>{
    console.log("Global not found handler called");
    let apiResponse = response.generate(true, "Route not found in the application", 404, null);
    // res.status(404).send("Route not found in the application");
    res.status(404).send(apiResponse);
}

module.exports = {
    globalErrorHanddler: errorHandler,
    globalNotFoundHanddler: notFoundHandler
}
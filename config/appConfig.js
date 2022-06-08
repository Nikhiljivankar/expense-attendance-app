let appConfig = {};

// appConfig.port = 4848;
appConfig.port = process.env.PORT || 4848,
appConfig.allowedCorsOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    //uri:'mongodb+srv://databse:database@cluster0.r3dbh.mongodb.net/Emp?retryWrites=true&w=majority'
    uri:'mongodb+srv://databse:database@cluster0.u1a2b.mongodb.net/Expenses?retryWrites=true&w=majority'
}
appConfig.apiVersion = '/api/v1';

module.exports = {

    port: appConfig.port,
    allowedCorsOrigin: appConfig.allowedCorsOrigin,
    environment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion

}// end module exports
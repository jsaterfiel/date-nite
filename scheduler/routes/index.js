const apiRoutes = require("./api");
const uberRides = require('node-uber/lib/resources/riders');

const constructorMethod = (app) => {
    app.use("/", uberRides);

};

module.exports = constructorMethod;

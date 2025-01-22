const path = require("path");

require('dotenv').config({path:'../../.env'})

const appName = process.env.APP_NAME;
const appEnv = process.env.APP_ENV;
const appPort = process.env.APP_PORT;
const debug = process.env.DEBUG;

console.log(appName);
console.log(appEnv);
console.log(appPort);
console.log(debug);
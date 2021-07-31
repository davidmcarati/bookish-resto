const dotenv                = require('dotenv').config();
const express               = require("express");
const app                   = express();
let   http                  = require("http");
let   server                = require("http").Server(app);
let   bodyParser            = require("body-parser");
let   bookingSys            = require("./BookingSys/booking_api.js");

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/book', bookingSys);
module.exports = app;

server.listen(port, () => { console.log(`Server is up and happy on port : ${port}`)});
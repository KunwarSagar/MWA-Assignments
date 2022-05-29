require("dotenv").config();
require("./api/data/dbconnect");
const express = require("express");
const router = require("./api/routes");

const app = express();

app.use('/api', router);

const server = app.listen(process.env.PORT, function(){
    console.log("Listening to http://localhost:"+server.address().port);
});
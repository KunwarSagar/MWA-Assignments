const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const router = require("./api/routes/index")

app.use(router);

const server = app.listen(process.env.PORT, function(){
    console.log("Listening to http://localhost:"+server.address().port)
})

require("dotenv").config();
const express = require("express");
const db =  require("./api/data/dbConnection").open();
const path = require("path");
const router = require("./api/routes/index")

const app = express();

app.use(router);

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function(){
    console.log("Listening to http://localhost:"+server.address().port);
})
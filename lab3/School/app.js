const express = require("express");
require("dotenv").config();
const router = require("./api/routes/index")
const app = express();

app.use(router);

const server = app.listen(process.env.PORT, function(){
    console.log("Listening to http://localhost:"+server.address().port);

})
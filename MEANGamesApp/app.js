const express = require("express")
require("dotenv").config();
const path = require("path");

const app = express();

app.get("/", function(req, res){
    res.status(200).sendFile(path.join(__dirname,"/public/index.html"))
});

const server = app.listen(process.env.PORT, function(){
    console.log("Listening to http://localhost:"+server.address().port);
})
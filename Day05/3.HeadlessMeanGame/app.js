require("dotenv").config();
require("./api/data/dbconnect");
const express = require("express");
const router = require("./api/routes");
const path = require("path");

const app = express();

app.get(function(req,res){
    res.status(200).sendFile(path.join(__dirname, "./public/index.html"))
});

app.use(express.urlencoded({ extended: true }));     
app.use('/api',router)

// requires for css and styesheet
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function(){
    console.log("Listenting to http://localhost:"+server.address().port);
})

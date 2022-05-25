const express = require("express")
require("dotenv").config();
const path = require("path");

const app = express();

app.get("/", function(req, res){
    res.status(200).sendFile(path.join(__dirname,"/public/index.html"))
});

app.post(["/","index.html","page1.html","page2.html"], function(req, res){
    res.status(200).json({"message":"Hello World"})
});

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function(){
    console.log("Listening to http://localhost:"+server.address().port);
})
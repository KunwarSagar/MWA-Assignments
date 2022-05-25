const express = require("express")
require("dotenv").config();
const path = require("path");

const app = express();

const routes = require("./api/routes")

app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')))

const server = app.listen(process.env.PORT, function(){
    console.log("Listening to http://localhost:"+server.address().port);
})
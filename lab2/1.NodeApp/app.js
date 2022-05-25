const http = require("http");
const fs = require("fs");
const port = 4343;

let indexFileBuffer = "File Not Yet Read";

const myRouter = function(req, res){
    if(req.method == "POST"){
        serveJson(req, res);
    }else if(req.method == "GET"){
        
        switch(req.url){
            case "/index.html":
                serveFile(res,"index");
                break;
            case "/page1.html":
                serveFile(res,"page1");
                break;
            case "/page2.html":
                serveFile(res,"page2");
                break;
            default:
                serveFile(res, null);
                break;
        }

    }else{
        res.end("Request Type Not Supported.")
    }
}

const serveJson = function(req, res){
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end('{"message" : "Hello World!"}');
}

const serveFile = function(res, page){
    if(page != null){
        readFile(page+".html", res);
    }else{
        readFile("index.html", res);
    }
}

const readFile = function(page, res){
    fs.readFile(__dirname + "/public/"+page, function(err, buffer){
        indexFileBuffer = buffer;
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(indexFileBuffer);
    });
}

const server = http.createServer(myRouter);

server.listen(port, "localhost", function(){
    console.log("Server is running on http://localhost:"+port);
});
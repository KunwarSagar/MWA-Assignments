const mongoose = require("mongoose");
require("./games.model")
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", function(){
    console.log("connected to DB", process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function(){
    console.log("Disconnected from DB.");
});

mongoose.connection.on("error", function(error){
    console.log("Error on databse connection.",error);
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});

process.once("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid,"SIGUSR2");
    })
})
require("dotenv").config();
const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const getAll = function(req,res){
     let count = parseInt(process.env.QUERY_COUNT, process.env.RADIX);
    let offset = parseInt(process.env.QUERY_OFFSET, process.env.RADIX);

    if(req.query && req.query.count){
        count = parseInt(req.query.count, process.env.RADIX);
        count = count > 10 ? 10 : count;
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, process.env.RADIX);
    }

    Game.find().skip(offset).limit(count).exec(function(err, games){
        const response = {staus:200, message: games};
        if(err){
            console.log("Inertnal Server Error.");
            response.staus = 500;
            response.message = err;
        }

        res.status(response.staus).json(response.message);
    })
}

const getOne = function(req, res){
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        const response = {staus:200, message: game};
        if(err){
            console.log("Game not found");
            response.staus = 500;
            response.message = err;
        }

        res.status(response.staus).json(response.message);
    });
}

const addOne = function(req, res){

    let newGame = {
        title : req.body.title,
        year : req.body.year, 
        rate : req.body.rate, 
        price : req.body.price, 
        minPlayers : req.body.minPlayers, 
        maxPlayers : req.body.maxPlayers, 
        minAge : req.body.minAge
    };


    Game.create(newGame, function(err, game){
        const response = {staus:201, message: game};
        if(err){
            console.log("Error creating game");
            response.staus = 500;
            response.message = err;
        }

        res.status(response.staus).json(response.message);
    });
}

const deleteOne = function(req, res){
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function(err, deletedGame){
        const response = { status: 204, message: deletedGame };
        if (err) {
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        } else if (!deletedGame) {
            console.log("Game id not found");
            response.status = 404;
            response.message = {
                "message": "Game ID not found"
            };
        }
        res.status(response.status).json(response.message);
    })
}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne
}
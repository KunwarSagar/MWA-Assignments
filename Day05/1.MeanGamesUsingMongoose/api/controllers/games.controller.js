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
        if(err){
            console.log("Error occured", err);
            res.status(500).end("Inertnal Server Error.")
        }
        res.status(200).json(games);
    })
}

const getOne = function(req, res){
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function(err, game){
        if(err){
            console.log("Error occured", err);
            res.status(500).end("Game not found")
        }
        res.status(200).json(game);
    });
}

module.exports = {
    getAll,
    getOne
}
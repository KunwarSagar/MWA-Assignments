require("dotenv").config();
const { response } = require("express");
const mongoose = require("mongoose");

const Game = mongoose.model(process.env.GAME_MODEL);

const getPublisher = function(req, res){
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        const response = {status:200, message:game.publisher};
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = err;
        }else if(!game){
            console.log("Game ID not found.");
            response.status = 404;
            response.message = {message:"Game Id not found."};
        }
        res.status(response.status).json(response.message);
    });
}

const addPublisher = function(req, res){
    updatePublisher(req, res);
}

const updatePublisher = function(req, res){
    const update = function(req, res, game, response){
        const publisher = {
            name : req.body.publisherName ? req.body.publisherName : game.publisher.name,
            country : req.body.publisherCountry ? req.body.publisherCountry : game.publisher.country,
            established: req.body.publisherEstablished ? req.body.publisherEstablished : game.publisher.established
        }
        game.publisher = publisher;
        
        game.save(function(err, updatedGame){
            if(err){
                console.log("Error",err);
                response.message = {message:"Internal server error"};
                response.status = 404
            }else{
                console.log("Game Updated");
                response.status = 201;
                response.message = updatedGame.publisher;
            }
            res.status(response.status).json(response.message);
        })
    }
    _updatePublisher(req, res, update);
}

const _updatePublisher = function(req, res, update){
    const gameId = req.params.gameId;

    Game.findById(gameId).select("publisher").exec(function(err, game){
        const response = {status:204, message:game.publisher};
        if(err){
            console.log("Error", err);
            response.status = 500;
            response.message = {message:"Internal server error"};
        }else if(!game){
            console.log("Game not found");
            response.status = 404;
            response.message = {message:"Game not found"};
        }
        
        if(response.status != 204){
            res.status(response.status).json(response.message);
        }
        update(req, res, game, response);
    })
    
}

const deletePublisher = function(req, res){
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){

        if(game){
            _deletePublisher(req, res, game);
            return;
        }

        const response = {status:204, message:[]};
        if(err){
            console.log("Error finding game");
            response.status = 500;
            response.message = {message:"Internal server error"}
        }else if(!game){
            console.log("Game not found");
            response.status = 404;
            response.message = {message:"Game not found"}
        }
        res.status(response.status).json(response.message);
    });
}

const _deletePublisher = function(req, res, game){
    game.publisher.remove();
    game.save(function(err, updatedGame){
        const response = {status:204, message:[]}
        if(err){
            console.log("Error", err);
            response.status = 500;
            response.message = err;
        }else{
            response.status = 201;
            response.message = updatedGame;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getPublisher,
    addPublisher,
    updatePublisher,
    deletePublisher
}
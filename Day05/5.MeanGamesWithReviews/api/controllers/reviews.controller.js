const Game = require("mongoose").model(process.env.GAME_MODEL);

const getAll = function(req, res){
    const gameId = req.params.gameId;

    Game.findById(gameId).select("reviews").exec(function(err, games){
        const response = {status: 200, message:games.reviews};
        if(err){
            console.log("Internal server error");
            response.status = 500;
            response.message = err;
        }

        res.status(response.status).json(response);
    })
    

}

const getOne = function(req, res){
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    Game.findById(gameId).select("reviews").exec(function(err, game){
        const response = {status:200, message:game.reviews.id(reviewId)};
        if(err){
            console.log("Internal server error");
            response.status = 500;
            response.message = "Internal server error";
        }else if(!game){
            console.log("Game ID not found.");
            response.status = 404;
            response.message = {message:"Game ID not found."}
        }
        res.status(response.status).json(response.message);
    });
}

const addOne =  function(req, res){
    const gameId = req.params.gameId;
    
    Game.findById(gameId).select("reviews").exec(function(err, game){
        const response = {status: 200, message:game};

        if(err){
            response.message = {message: "Internal server error"};
            response.status = 500;
        }else if(!game){
            response.message = {message: "Game not found"};
            response.status = 404;
        }
        if(game){
            _addReview(req, res, game);
        }else{
            res.status(response.status).json(response.message);
        }
    })
}
const _addReview = function(req, res, game){
    game.reviews = [...game.reviews, ...req.body.reviews];
    game.save(function(err, updatedGame){
        const response = {status:201, message:updatedGame.reviews}
        if(err){
            response.status = 500;
            response.message = {message:"Internal server error"};
        }
        res.status(response.status).json(response.message);
    })
}

const deleteOne = function(req, res){
    const gameId = req.params.gameId;

    Game.findById(gameId).exec(function(err, game){
        const response ={status: 204, message:[]};
        if(err){
            response.message = {message:"Internal server error"};
            response.status = 500;
        }else if(!game){
            response.status = 404;
            response.message = {message:"Game not found."};
        }
        if(response.status != 204){
            res.status(response.status).json(response.message);
        }
        _deleteOne(req, res, game);
    });
}
const _deleteOne = function(req, res, game){
    const reviewId = req.params.reviewId;
    game.reviews.id(reviewId).remove();
    game.save(function(err, updatedGame){
        const response = {status: 201, message:updatedGame.reviews.id(reviewId)}
        if(err){
            response.status = 500;
            response.message = {message : "Internal server error."}
        }
        res.status(response.status).json(response.message);
    });
}
module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne
}
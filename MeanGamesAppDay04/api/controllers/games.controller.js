require("dotenv").config;
const dbConn = require("./../data/dbConnection");
const ObjectId = require("mongodb").ObjectId;

const getAll = function(req, res){
    let count = parseInt(process.env.QUERY_COUNT, process.env.RADIX);
    let offset = parseInt(process.env.QUERY_OFFSET, process.env.RADIX);
    if(req.query && req.query.count){
        count = parseInt(req.query.count, process.env.RADIX);
        count = count > 10 ? 10 : count;
    }
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, process.env.RADIX);
    }

    const db = dbConn.get();

    const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION);
    gamesCollection.find().skip(offset).limit(count).toArray(function(err, docs){
        if(err){
            console.log("Error occired while fetching array of data.");
            return;
        }
        res.status(200).json(docs);
    })

}

const getOne = function(req, res){
    const db = dbConn.get();
    const gamesCollection = db.collection(process.env.DB_GAMES_COLLECTION);
    const gameId = req.params.gameId;
    gamesCollection.findOne({_id: ObjectId(gameId)}, function(err, game){
        if(err){
            console.log("Error fecthing game by Id:", gameId);
            return;
        }
        res.status(200).json(game);
    })
}

module.exports = {
    getAll,
    getOne
}
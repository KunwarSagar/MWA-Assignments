const gamesData = require("./../data/games.json");
require("dotenv").config();

const getAll = function(req, res){
    let count = process.env.QUERY_COUNT;
    let offset = process.env.QUERY_OFFSET;

    if(req.query && req.query.count){
        count = parseInt(req.query.count, process.env.RADIX)
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, process.env.RADIX)
    }

    const pageGames = gamesData.slice(offset, offset+count);
    res.status(200).json(pageGames);
}

const getOne = function(req, res){
    res.status(200).json(gamesData[req.params.index]);
}

module.exports = {
    getAll,
    getOne
}
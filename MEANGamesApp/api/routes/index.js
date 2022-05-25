const express = require("express");
const path = require("path");
const router = express.Router();
const gameController = require("./../controller/games.controller")

router.route("/")
    .get(function(req, res){
        res.status(200).sendFile(path.join(__dirname,"../../public/index.html"))
    });

router.route("/games")
    .get(gameController.getAll);

router.route("/games/:index")
    .get(gameController.getOne);

module.exports = router;
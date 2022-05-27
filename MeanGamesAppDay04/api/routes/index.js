const express = require("express");
const router = express.Router();
const path = require("path");

const gameController = require("./../controllers/games.controller");

router.route("/")
    .get(function(req,res){
        res.status(200).sendFile(path.join(__dirname, "../../public/index.html"))
    });

router.route("/games")
    .get(gameController.getAll);
router.route("/games/:gameId")
    .get(gameController.getOne);

module.exports = router;

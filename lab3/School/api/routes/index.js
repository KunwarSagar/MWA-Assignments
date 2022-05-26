const express = require("express");
const router = express.Router();
const schoolController = require("./../controllers/schoolController")
router.route("/").get(function(req,res){
    res.status(200).end("School App")
})

router.route("/students").get(schoolController.getAll);
router.route("/students/:index").get(schoolController.getOne);

module.exports = router;
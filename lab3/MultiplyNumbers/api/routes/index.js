const express = require("express");
const router = express.Router();
const controller = require("./../controllers/index")

router.route("/").get(function(req,res){
    res.status(200).end("Multiply App, Use URL in the form /multiply/{firstNumber}/?secondNumber=12 to send multiply request")
})

/**
 * Example URL
 * multiply/{firstNumber}/?secondNumber=12
 */
router.route('/multiply/:firstNumber')
    .get(controller.multiply);

module.exports = router;
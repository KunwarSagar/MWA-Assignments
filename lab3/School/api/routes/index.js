const express = require("express");
const router = express.Router();
const schoolController = require("./../controllers/schoolController")

router.route("/students").get(schoolController.getAll);
router.route("/students/:index").get(schoolController.getOne);

module.exports = router;
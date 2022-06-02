const router = require("express").Router();
const gamesController = require("../controllers/games.controller")
const publishersController = require("../controllers/publishers.controller");
const reviewsController = require("./../controllers/reviews.controller");
router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne);
    
router.route("/games/:gameId")
    .get(gamesController.getOne)
    .delete(gamesController.deleteOne);

router.route("/games/:gameId/publisher")
    .get(publishersController.getPublisher)
    .post(publishersController.addPublisher)
    .put(publishersController.updatePublisher)
    .delete(publishersController.deletePublisher);

router.route("/games/:gameId/reviews")
    .get(reviewsController.getAll)
    .post(reviewsController.addOne);

router.route("/games/:gameId/reviews/:reviewId")
    .get(reviewsController.getOne)
    .delete(reviewsController.deleteOne);

module.exports = router;
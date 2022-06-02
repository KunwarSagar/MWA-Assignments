const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema({
    name: String,
    location: {
        // stored as longitude (E/W), latitude (N/S)
        coordinates : {
            type : [ Number ],
            index: "2dsphere"
        }
    },
    country: String,
    established: Number
})

const reviewsSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    review: String,
    postDate: Date
});

const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    year: Number,
    rate: {
        type: Number,
        min:1,
        max:5,
        "default":1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min:1,
        max:10,
    },
    maxPlayers: {
        type: Number,
        min:1,
        max:10,
    },
    publisher: publisherSchema,
    reviews: [ reviewsSchema ],
    minAge: Number,
    designers: [ String ]
});

mongoose.model(process.env.GAME_MODEL, gameSchema, process.env.DB_GAMES_COLLECTION);
let express = require("express");
let router = express.Router();

let game = require("../models/game")
let genre = require("../models/genre");
let company = require("../models/company")

let async = require("async");




// HOME PAGE //
exports.homePage = function (req, res) {
    async.parallel({
        gameCount: function (callback) {
            //empty object as match to find all documents
            game.countDocuments({}, callback); 
        },
        companyCount: function (callback) {
            company.countDocuments({}, callback)
        },
        genreCount: function (callback) {
            genre.countDocuments({}, callback)
        }
    },
        function (err, results) {
        res.render("index", {title: "Game Collection", error: err, data:results})
    })
}

//DISPLAY GAME LIST //
exports.gameList = function (req, res) {
    res.send("GAME LIST")
}
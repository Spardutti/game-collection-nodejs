let express = require("express");
let router = express.Router();


let genre = require("../models/genre");



//GENRE LIST
exports.genreList = function (req, res) {
    res.send("GENRE LIST")
}
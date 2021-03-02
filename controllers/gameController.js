let express = require("express");
let router = express.Router();

let game = require("../models/game");
let genre = require("../models/genre");
let company = require("../models/company");

let async = require("async");

// HOME PAGE //
exports.homePage = function (req, res) {
  async.parallel(
    {
      gameCount: function (callback) {
        //empty object as match to find all documents
        game.countDocuments({}, callback);
      },
      companyCount: function (callback) {
        company.countDocuments({}, callback);
      },
      genreCount: function (callback) {
        genre.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Game Collection",
        error: err,
        data: results,
      });
    }
  );
};

//DISPLAY GAME LIST //
exports.gameList = function (req, res, next) {
  game
    .find({}, "name company")
    .populate("company")
    .exec(function (err, listGame) {
      if (err) {
        return next(err);
      }
      //succes getting data
      res.render("gameList", { title: "Game List", gameList: listGame });
    });
};

// DISPLAY SINGLE GAME //
exports.singleGame = function (req, res, next) {
  async.parallel(
    {
      game: function (callback) {
        game
          .findById(req.params.id)
          .populate("company")
          .populate("genre")
          .exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.game == null) {
        let err = new Error("Game not found");
        err.status = 404;
        return next(err);
      }
      //success
      res.render("singleGame", {
        title: results.game.name,
        description: results.game.description,
        company: results.game.company,
        rating: results.game.rating,
        genre: results.game.genre,
        status: results.game.status,
      });
    }
  );
};

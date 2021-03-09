let express = require("express");
let router = express.Router();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let Game = require("../models/game");
let Genre = require("../models/genre");
let Company = require("../models/company");
let User = require("../models/user");

let { body, validationResult } = require("express-validator");

let async = require("async");

//SINGUP PAGE GET
exports.signUp = function (req, res, next) {
  res.render("logIn", { user: req.user });
};

//SIGN UP PAGE POST
exports.signUpPost = function (req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  }).save((err) => {
    if (err) return next(err);
    //success
    res.redirect("/");
  });
};

// HOME PAGE //
exports.homePage = function (req, res) {
  async.parallel(
    {
      gameCount: function (callback) {
        //empty object as match to find all documents
        Game.countDocuments({}, callback);
      },
      companyCount: function (callback) {
        Company.countDocuments({}, callback);
      },
      genreCount: function (callback) {
        Genre.countDocuments({}, callback);
      },
    },
    function (err, results) {
      res.render("index", {
        title: "Game Collection",
        error: err,
        data: results,
        user: req.user,
      });
    }
  );
};

//DISPLAY GAME LIST //
exports.gameList = function (req, res, next) {
  Game.find({}, "name company")
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
        Game.findById(req.params.id)
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
        game: results.game,
        user: req.user,
      });
    }
  );
};

//GET CREATE GAME FORM
exports.addGame = function (req, res, next) {
  async.parallel(
    {
      companies: function (callback) {
        Company.find(callback);
      },
      genres: function (callback) {
        Genre.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("gameForm", {
        title: "Add Game",
        companies: results.companies,
        genres: results.genres,
        status: ["Completed", "Playing", "Wish List", "Collecting Dust"],
      });
    }
  );
};

//POST CREATE FORM
exports.addGamePost = [
  //Process the request after validation

  body("name", "Name must not be empty.").isLength({ min: 1 }).escape(),
  body("company", "Company must not be empty.").isLength({ min: 1 }).escape(),
  body("rating", "Rating must not be empty.").isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty.")
    .isLength({ min: 1 })
    .escape(),
  (req, res, next) => {
    //extract errors
    const errors = validationResult(req);

    //Create a Game object with validation results
    let game = new Game({
      name: req.body.name,
      company: req.body.company,
      rating: req.body.rating,
      genre: req.body.genre,
      status: req.body.status,
      description: req.body.description,
    });

    // Save Game
    game.save(function (err) {
      if (err) {
        return next(err);
      }
      //Success
      res.redirect(game.url);
    });
  },
];

//DELETE GAME GET
exports.gameDelete = function (req, res, next) {
  async.parallel(
    {
      game: function (callback) {
        Game.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      //Success
      res.render("gameDelete", {
        title: "Delete Game",
        game: results.game,
      });
    }
  );
};

//DELETE GAME POST
exports.gameDeletePost = function (req, res, next) {
  async.parallel(
    {
      game: function (callback) {
        Game.findById(req.params.gameid).exec(callback);
      },
    },
    function (err, resulst) {
      if (err) {
        return next(err);
      }
      //Success
      Game.findByIdAndRemove(req.body.gameid, function removeGame(err) {
        if (err) {
          return next(err);
        }
        //Success, proceed to delete
        res.redirect("/home/games");
      });
    }
  );
};
//UPDATE GAME GET
exports.updateGame = function (req, res, next) {
  async.parallel(
    {
      game: function (callback) {
        Game.findById(req.params.id).exec(callback);
      },
      company: function (callback) {
        Company.find(callback);
      },
      genre: function (callback) {
        Genre.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        next(err);
      }
      //Succes
      res.render("gameUpdate", {
        game: results.game,
        companies: results.company,
        genres: results.genre,
        status: ["Completed", "Playing", "Wish List", "Collecting Dust"],
        title: results.game.name,
      });
    }
  );
};

//UPDATE GAME POST
exports.updateGamePost = function (req, res, next) {
  let game = new Game({
    name: req.body.name,
    company: req.body.company,
    rating: req.body.rating,
    genre: req.body.genre,
    status: req.body.status,
    description: req.body.description,
    _id: req.params.id,
  });

  Game.findByIdAndUpdate(req.params.id, game, {}, function (err, thegame) {
    if (err) {
      return next(err);
    }
    //Success
    res.redirect(thegame.url);
  });
};

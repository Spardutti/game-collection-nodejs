#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Game = require("./models/game");
var Company = require("./models/company");
var Genre = require("./models/genre");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var companies = [];
var genres = [];
var games = [];

function companyCreate(name, year, description, cb) {
  companydetail = {
    name: name,
    year: year,
    description: description,
  };

  var company = new Company(companydetail);

  company.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Company: " + company);
    companies.push(company);
    cb(null, company);
  });
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function gameCreate(name, company, rating, genre, description, cb) {
  gamedetail = {
    name: name,
    company: company,
    genre: genre,
    rating: rating,
    description: description,
  };
  if (genre != false) gamedetail.genre = genre;

  var game = new Game(gamedetail);
  game.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Game: " + game);
    games.push(game);
    cb(null, game);
  });
}

function createGenreCompanies(cb) {
  async.series(
    [
      function (callback) {
        companyCreate("Ubisoft", "1988-05-05", "Description", callback);
      },

      function (callback) {
        genreCreate("Fantasy", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createGames(cb) {
  async.parallel(
    [
      function (callback) {
        gameCreate(
          "God Of War",
          companies[0],
          "10",
          genres[0],
          "description",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createGenreCompanies, createGames],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("BOOKInstances: ");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

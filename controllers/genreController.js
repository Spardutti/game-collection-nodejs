let express = require("express");
let router = express.Router();
const { body, validationResult } = require("express-validator");

let Genre = require("../models/genre");



//GENRE LIST
exports.genreList = function (req, res) {
  res.send("GENRE LIST");
};

//ADD GENRE
exports.addGenre = function (req, res, next) {
  res.render("genreForm", { title: "Create Genre" });
};

exports.addGenrePost = [
  // Validate and santize the name field.
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    var genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genreForm", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
        if (err) {
          return next(err);
        }

        if (found_genre) {
          // Genre exists, redirect to its detail page.
          res.render("genreForm", {title: "Genre Already exist"});
        } else {
          genre.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect("/")
          });
        }
      });
    }
  },
];

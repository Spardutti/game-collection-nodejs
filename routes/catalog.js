let express = require("express");
let router = express.Router();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



let gameController = require("../controllers/gameController");
let companyController = require("../controllers/companyController");
let genreController = require("../controllers/genreController");

// HOME PAGE //
router.get("/", gameController.homePage);

//SIGN UP
router.get("/sign", gameController.signUp);

//SIGN UP POST
router.post("/sign", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
}));

///////////////////////////////////// GAME ROUTES //

// GAME LIST
router.get("/games", gameController.gameList);

// SINGLE GAME
router.get("/games/:id", gameController.singleGame)

//GAME FORM
router.get("/creategame", gameController.addGame)

//POST GAME FORM
router.post("/creategame", gameController.addGamePost)

//DELETE GAME GET
router.get("/games/:id/delete", gameController.gameDelete)

//DELETE GAME POST
router.post("/games/:id/delete", gameController.gameDeletePost);

//UPDATE GAME GET
router.get("/games/:id/update", gameController.updateGame);

//UPDATE GAME POST
router.post("/games/:id/update", gameController.updateGamePost);


///////////////////////////////////// COMPANY ROUTES //

//GET FORM CREATE
router.get("/companyForm", companyController.companyForm);

// POST FORM
router.post("/companyForm", companyController.companyFormPost);

//DELETE COMPANY GET
router.get("/companies/:id/delete", companyController.companyDelete);

//DELETE COMPANY POST
router.post("/companies/:id/delete", companyController.companyDeletePost)

//COMPANY LIST
router.get("/companies", companyController.companyList);

//SINGLE COMPANY
router.get("/companies/:id", companyController.singleCompany);

//UPDATE COMPANY GET
router.get("/companies/:id/update", companyController.companyUpdate)

//UPDATE COMPANY POST
router.post("/companies/:id/update", companyController.companyUpdatePost)


///////////////////////////////////// GENRE ROUTES //

//GENRE LIST

router.get("/genres", genreController.genreList);

// GET GENRE CREATE
router.get("/genreform", genreController.addGenre)

//POST GENRE CReATE
router.post("/genreform", genreController.addGenrePost)

module.exports = router;

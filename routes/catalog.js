let express = require("express");
let router = express.Router();

let gameController = require("../controllers/gameController");
let companyController = require("../controllers/companyController");
let genreController = require("../controllers/genreController");

// HOME PAGE //
router.get("/", gameController.homePage);

///////////////////////////////////// GAME ROUTES //

// GAME LIST
router.get("/games", gameController.gameList);

// SINGLE GAME
router.get("/games/:id", gameController.singleGame)

//GAME FORM
router.get("/creategame", gameController.addGame)

///////////////////////////////////// COMPANY ROUTES //

//GET FORM
router.get("/companyForm", companyController.companyForm);

//COMPANY LIST
router.get("/companies", companyController.companyList);

//SINGLE COMPANY
router.get("/companies/:id", companyController.singleCompany);

// POST FORM
router.post("/companyForm", companyController.companyFormPost);

///////////////////////////////////// GENRE ROUTES //

//GENRE LIST

router.get("/genres", genreController.genreList);

// GET GENRE CREATE
router.get("/genreform", genreController.addGenre)

//POST GENRE CReATE
router.post("/genreform", genreController.addGenrePost)

module.exports = router;

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

//POST GAME FORM
router.post("/creategame", gameController.addGamePost)

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


///////////////////////////////////// GENRE ROUTES //

//GENRE LIST

router.get("/genres", genreController.genreList);

// GET GENRE CREATE
router.get("/genreform", genreController.addGenre)

//POST GENRE CReATE
router.post("/genreform", genreController.addGenrePost)

module.exports = router;

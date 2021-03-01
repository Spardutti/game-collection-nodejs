let express = require("express");
let router = express.Router();

let gameController = require("../controllers/gameController");
let companyController = require("../controllers/companyController");
let genreController = require("../controllers/genreController");

// HOME PAGE //
router.get("/", gameController.homePage);

// GAME ROUTES //

// GAME LIST
router.get("/games", gameController.gameList);

// COMPANY ROUTES //

//COMPANY LIST
router.get("/companies", companyController.companyList);

// GENRE ROUTES //

//GENRE LIST

router.get("/genres", genreController.genreList);

module.exports = router;

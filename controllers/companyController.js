let express = require("express");
let router = express.Router();

let Company = require("../models/company");

//DISPLAY COMPANY LIST

exports.companyList = function (req, res) {
    res.send("COMPANY LIST")
}
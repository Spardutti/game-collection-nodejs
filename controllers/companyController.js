let express = require("express");
let router = express.Router();

let Company = require("../models/company");

//DISPLAY COMPANY LIST
exports.companyList = function (req, res, next) {
  Company.find({}, "name").exec(function (err, listCompany) {
    if (err) {
      return next(err);
    }
    //success
    res.render("companyList", {
      title: "Company List",
      companyList: listCompany,
    });
  });
};

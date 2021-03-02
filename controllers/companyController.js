let express = require("express");
let router = express.Router();
let async = require("async");

let company = require("../models/company");

//DISPLAY COMPANY LIST
exports.companyList = function (req, res, next) {
  company.find({}, "name").exec(function (err, listCompany) {
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

//DISPLAY SINGLE COMPANY
exports.singleCompany = function (req, res, next) {
  async.parallel(
    {
      company: function (callback) {
        company.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.company == null) {
        let err = new Error("Company not found");
        err.status = 404;
        return next(err);
      }
      //Success
      res.render("singleCompany", { title: results.company.name, year: results.company.year, description: results.company.description });
    }
  );
};

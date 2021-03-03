let express = require("express");
let router = express.Router();
let async = require("async");
const { body, validationResult } = require("express-validator");

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

//DISPLAY SINGLE COMPANY
exports.singleCompany = function (req, res, next) {
  async.parallel(
    {
      company: function (callback) {
        Company.findById(req.params.id).exec(callback);
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
      res.render("singleCompany", {
        title: results.company.name,
        year: results.company.yearFormatted,
        description: results.company.description,
      });
    }
  );
};

// COMPANY FORM GET
exports.companyForm = function (req, res, next) {
  res.render("companyForm", { title: "Create Company" });
};

//COMPANY FORM POST

exports.companyFormPost = [
  body("year", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //there are errors in the validation
      res.render("companyForm", {
        title: "Create Company",
        company: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      //Data is valid create COmpany

      let company = new Company({
        name: req.body.name,
        year: req.body.year,
        description: req.body.description,
      });
      company.save(function (err) {
        if (err) {
          return next(err);
        }
        //success
        res.redirect(company.url);
      });
    }
  },
];

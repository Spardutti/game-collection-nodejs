let express = require("express");
let router = express.Router();
let async = require("async");
const { body, validationResult } = require("express-validator");

let Company = require("../models/company");
let Game = require("../models/game");

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
        company: results.company,
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
      //Data is valid create Company

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

//DELETE COMPANY GET
exports.companyDelete = function (req, res, next) {
  async.parallel(
    {
      company: function (callback) {
        Company.findById(req.params.id).exec(callback);
      },
      companyGames: function (callback) {
        Game.find({ company: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.company == null) {
        //No Results.
        res.redirect("/catalog/companies");
      }
      //Succes
      res.render("companyDelete", {
        title: "Delete Company",
        company: results.company,
        companyGames: results.companyGames,
        year: results.company.yearFormatted,
      });
    }
  );
};
//DELETE COMPANY POST
exports.companyDeletePost = function (req, res, next) {
  async.parallel(
    {
      company: function (callback) {
        Company.findById(req.body.companyid).exec(callback);
      },
      companyGames: function (callback) {
        Game.find({ company: req.body.companyid }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      //Success
      //Company have no games Delete it and redirect to company list
      Company.findByIdAndRemove(
        req.body.companyid,
        function deleteCompany(err) {
          if (err) {
            return next(err);
          }
          //Success render companylist
          res.redirect("/home/companies");
        }
      );
    }
  );
};

//COMPANY UPDATE GET
exports.companyUpdate = function (req, res, next) {
  async.parallel({
    company: function (callback) {
      Company.findById(req.params.id).exec(callback)
    }
  },
    function (err, results) {
      if (err) { return next(err) }
      //Success
      res.render("companyUpdate", {company: results.company, title: results.company.name})
  })
}

//COMPANY UPDATE POST
exports.companyUpdatePost = function (req, res, next) {
  let company = new Company({
    name: req.body.name,
    year: req.body.year,
    description: req.body.year,
    _id: req.params.id,
  })
  Company.findByIdAndUpdate(req.params.id, company, {}, function (err, theCompany) {
    if (err) { return next(err) }
    //Success
    res.redirect(theCompany.url)
  })
};
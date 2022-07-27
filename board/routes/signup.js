const e = require("express");
var express = require("express");
var router = express.Router();
var connection = require("../db/db");

router.get("/", (req, res) => {
  if (req.session.uid) {
    delete req.session.uid;
    delete req.session.isLogined;
    delete req.session.author_id;
    req.session.save(function () {
      res.redirect("/");
    });
  } else {
    res.render("signup", { signinStatus: true });
  }
});

router.post("/", (req, res) => {
  var id = req.body.id;
  var pw = req.body.pw;
  var name = req.body.name;
  connection.query(
    "INSERT INTO users VALUES (?, ?, ?);",
    [id, pw, name],
    (err1, res1, fld1) => {
      try {
        res.render("signup_complete", { signinStatus: false, name: name });
      } catch (err1) {
        if (err1.errno == 1062) {
          res.render("signup");
          throw err1;
        }
        throw err1;
      } 
    }
  );
});

module.exports = router;

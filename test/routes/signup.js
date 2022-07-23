const e = require("express");
var express = require("express");
var router = express.Router();
var connection = require("../db/db");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "11111111",
  database: "board",
};
var sessionStore = new MySQLStore(options);

router.use(
  session({
    secret: "asdfasffdas",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

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
      if (err1) {
        if (err1.errno == 1062) {
          console.log("이미 등록된 아이디입니다.");
          res.render("signup");
          throw err1;
        }
        throw err1;
      } else {
        console.log("이름이름이름이름 : " + name);
        res.render("signup_complete", { signinStatus: false, name: name });
      }
    }
  );
});

module.exports = router;

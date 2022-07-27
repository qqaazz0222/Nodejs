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
    res.render("signin");
  }
});

router.post("/", (req, res) => {
  var id = req.body.id;
  var pw = req.body.pw;
  connection.query(
    "SELECT * FROM users WHERE id=?;",
    [id],
    (err1, res1, fld1) => {
      if (err1) {
        throw err1;
      } else {
        if (res1.length > 0) {
          if (pw === res1[0].pw) {
            console.log("로그인 성공");
            req.session.uid = res1[0].id;
            req.session.author_id = res1[0].author_id;
            req.session.isLogined = true;
            req.session.save(function () {
              res.redirect("../");
            });
          } else {
            console.log("비밀번호 불일치");
            res.redirect("/");
          }
        } else {
          console.log("아이디 불일치");
          res.redirect("/");
        }
      }
    }
  );
});

module.exports = router;

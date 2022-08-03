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
  connection.query("SELECT * FROM books;", (err1, res1, fld1) => {
    try {
      if (req.session.uid) {
        res.render("index", {
          books: res1,
          num: res1.length,
          signinStatus: true,
        });
      } else {
        res.render("index", {
          books: res1,
          num: res1.length,
          signinStatus: false,
        });
      }
    } catch (err1) {
      throw err1;
    }
  });
});

router.get("/book/:id", (req, res) => {
  if (req.session.uid) {
    connection.query(
      "SELECT * FROM books WHERE id=?;",
      [req.params.id],
      (err1, res1, fld1) => {
        try {
          res.render("book", {
            bookid: req.params.id,
            book: res1[0],
            signinStatus: true,
          });
        } catch (err1) {
          throw err1;
        }
      }
    );
  } else {
    res.send(
      "<script>alert('로그인이 필요합니다.'); location.href='/';</script>"
    );
  }
});

module.exports = router;

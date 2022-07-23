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
    if (err1) {
      throw err1;
    } else {
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
    }
  });
});

router.get("/test", (req, res) => {
  if (req.session.uid) {
    res.render("signup_complete", { signinStatus: true });
  } else {
    res.render("signup_complete", { signinStatus: false });
  }
});

router.get("/book/:id", (req, res) => {
  if (req.session.uid) {
    connection.query(
      "SELECT * FROM books WHERE id=?;",
      [req.params.id],
      (err1, res1, fld1) => {
        if (err1) {
          throw err1;
        } else {
          res.render("book", { book: res1[0], signinStatus: true });
        }
      }
    );
  } else {
    res.send(
      "<script>alert('로그인이 필요합니다.'); location.href='/';</script>"
    );
  }
});

router.get("/mypage", (req, res) => {
  if (req.session.uid) {
    console.log(req.session.uid);
    connection.query(
      "SELECT * FROM users WHERE id=?;",
      [req.session.uid],
      (err1, res1, fld1) => {
        if (err1) {
          throw err1;
        } else {
          res.render("mypage", { user: res1[0], signinStatus: true });
        }
      }
    );
  } else {
    res.send(
      "<script>alert('로그인이 필요합니다.'); location.href='/';</script>"
    );
  }
});

router.get("/cart", (req, res) => {
  if (req.session.uid) {
    console.log(req.session.uid);
    connection.query(
      "SELECT * FROM cart WHERE userid=?;",
      [req.session.uid],
      (err1, res1, fld1) => {
        if (err1) {
          throw err1;
        } else {
          res.render("card", {
            card: res1,
            num: res1.length,
            signinStatus: true,
          });
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

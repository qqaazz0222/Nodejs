const e = require("express");
var express = require("express");
var router = express.Router();
var connection = require("../db/db");

router.get("/", (req, res) => {
  if (req.session.uid) {
    console.log(req.session.uid);
    connection.query(
      "SELECT cart.id, itemid, amount, books.id AS bookid, books.title AS title, books.price AS price FROM cart JOIN books WHERE itemid = books.id AND userid = ?;",
      [req.session.uid],
      (err1, res1, fld1) => {
        try {
          res.render("cart", {
            order: res1,
            signinStatus: true,
          });
        } catch {
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

router.post("/", (req, res) => {
  if (req.session.uid) {
    var book = {
      id: req.body.bookid,
      title: req.body.booktitle,
      price: req.body.bookprice,
    };
    var amount = req.body.amount;
    connection.query(
      "INSERT INTO cart VALUES (null, ?, ?, ?);",
      [book.id, amount, req.session.uid],
      (err1, res1, fld1) => {
        try {
          res.redirect("/");
        } catch (err1) {
          throw err1;
        }
      }
    );
  } else {
    res.send(
      "<script>alert('잘못된 접근입니다.'); location.href='/';</script>"
    );
  }
});

router.post("/modify/:id", (req, res) => {
  var code =
    req.body.card1 +
    "-" +
    req.body.card2 +
    "-" +
    req.body.card3 +
    "-" +
    req.body.card4;
  var validity = req.body.month + "/" + req.body.year;
  connection.query(
    "UPDATE card SET validity=?, code=? WHERE id = ?;",
    [validity, code, req.params.id],
    (err1, res1, fld1) => {
      try {
        res.send(
          "<script>alert('수정되었습니다.'); location.href='/card';</script>"
        );
      } catch (err1) {
        throw err1;
      } 
    }
  );
});

router.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM cart WHERE id=?;",
    [req.params.id],
    (err1, res1, fld1) => {
      try {
        res.send(
          "<script>alert('삭제되었습니다.'); location.href='/cart';</script>"
        );
      } catch (err1) {
        throw err1;
      }
    }
  );
});

module.exports = router;

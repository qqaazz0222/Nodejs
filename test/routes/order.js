const e = require("express");
var express = require("express");
var router = express.Router();
var connection = require("../db/db");

router.get("/", (req, res) => {
  res.send("<script>alert('잘못된 접근입니다.'); location.href='/';</script>");
});

router.post("/", (req, res) => {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth()+1;
  var day = today.getDate();
  var date = year + "-" + month + "-" + day;
  var book = { id: req.body.bookid, title: req.body.booktitle, price: req.body.bookprice };
  var amount = req.body.amount;

  res.render("order", { date: date, book: book, amount: amount, signinStatus: true });
  // connection.query(
  //   "INSERT INTO orders VALUES (null, ?, ?, ?, ?);",
  //   [date, bookid, amount, user],
  //   (err1, res1, fld1) => {
  //     if (err1) {
  //       throw err1;
  //     } else {
  //       res.send(
  //         "<script>alert('추가되었습니다.'); location.href='/mypage';</script>"
  //       );
  //     }
  //   }
  // );
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
      if (err1) {
        throw err1;
      } else {
        res.send(
          "<script>alert('수정되었습니다.'); location.href='/card';</script>"
        );
      }
    }
  );
});

router.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM card WHERE id=?;",
    [req.params.id],
    (err1, res1, fld1) => {
      if (err1) {
        throw err1;
      } else {
        res.send(
          "<script>alert('삭제되었습니다.'); location.href='/card';</script>"
        );
      }
    }
  );
});

module.exports = router;

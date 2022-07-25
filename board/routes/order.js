const e = require("express");
var express = require("express");
var router = express.Router();
var connection = require("../db/db");

router.get("/", (req, res) => {
  res.send(
    "<script>alert('잘못된 접근입니다.'); location.href='/';</script>"
  );
});

router.post("/", (req, res) => {
  if (req.session.uid) {
    var book = { id: req.body.bookid, title: req.body.booktitle, price: req.body.bookprice };
    var amount = req.body.amount;
    connection.query(
      "SELECT * FROM address WHERE userid=?;",
      [req.session.uid],
      (err1, res1, fld1) => {
        if (err1) {
          throw err1;
        } else {
          connection.query(
            "SELECT * FROM card WHERE userid=?;",
            [req.session.uid],
            (err2, res2, fld2) => {
              if (err2) {
                throw err2;
              } else {
                res.render("order", { book: book, amount: amount, address: res1, card: res2, num1: res1.length, num2: res2.length, signinStatus: true });
              }
            }
          )
        }
      }
    )
  }
  else {
    res.send(
      "<script>alert('잘못된 접근입니다.'); location.href='/';</script>"
    );
  }
});

router.post("/complete", (req, res) => {
  if (req.session.uid) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    var day = today.getDate();
    var date = year + "-" + month + "-" + day;
    var amount = req.body.amount;
    var user = req.session.uid;
    connection.query(
      "SELECT * FROM books WHERE id = ?;",
      [req.body.sel_book],
      (errBook, resBook, fldBook) => {
        if (errBook) {
          throw errBook;
        } else {
          connection.query(
            "SELECT * FROM address WHERE id = ?;",
            [req.body.sel_address],
            (errAddress, resAddress, fldAddress) => {
              if (errAddress) {
                throw errAddress;
              } else {
                connection.query(
                  "SELECT * FROM card WHERE id = ?;",
                  [req.body.sel_card],
                  (errCard, resCard, fldCard) => {
                    if (errCard) {
                      throw errCard;
                    } else {
                      connection.query(
                        "INSERT INTO orders VALUES (null, ?, ?, ?, ?, ?, ?);",
                        [date, req.body.sel_book, amount, req.body.sel_address, req.body.sel_card, user],
                        (err1, res1, fld1) => {
                          if (err1) {
                            throw err1;
                          } else {
                            console.log("data", resBook[0].id, resAddress[0].id, resCard[0].id);
                            res.render("order_complete", {date: date, book: resBook[0], amount: amount, address: resAddress[0], card: resCard[0], signinStatus: true });
                          }
                        }
                      )
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
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

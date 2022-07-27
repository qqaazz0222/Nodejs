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
    var month = today.getMonth() + 1;
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
                            res.render("order_complete", { date: date, book: resBook[0], amount: amount, address: resAddress[0], card: resCard[0], signinStatus: true });
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

router.post("/cart", (req, res) => {
  if (req.session.uid) {
    var item = req.body.item;
    connection.query(
      "SELECT * FROM address WHERE userid=?;",
      [req.session.uid],
      (err1, res1, fld1) => {
        try {
          connection.query(
            "SELECT * FROM card WHERE userid=?;",
            [req.session.uid],
            (err2, res2, fld2) => {
              try {
                connection.query(
                  "SELECT cart.id, itemid, amount, userid, books.id AS bookid, title, price, convert(amount, signed) * convert(price, signed) AS total FROM cart JOIN books WHERE cart.id IN (?) AND itemid = books.id;",
                  [item],
                  (err3, res3, fld3) => {
                    try {
                      res.render("order_cart", { address: res1, card: res2, order: res3, signinStatus: true });
                    } catch (err3) {
                      throw err3;
                    }
                  }
                )
              } catch (err2) {
                throw err2;
              }
            }
          )
        } catch (err1) {
          throw err1;
        }
      }
    );
  }
  else {
    res.send(
      "<script>alert('잘못된 접근입니다.'); location.href='/';</script>"
    );
  }
});

router.post("/cart/complete", (req, res) => {
  if (req.session.uid) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var date = year + "-" + month + "-" + day;
    var cartid = req.body.order_cartid.split(',');
    var books = req.body.order_item.split(',');
    var amount = req.body.order_amount.split(',');
    var user = req.session.uid;
    connection.query(
      "SELECT * FROM books WHERE id IN (?);",
      [books],
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
                      for (var i = 0; i < books.length; i++) {
                        connection.query(
                          "INSERT INTO orders VALUES (null, ?, ?, ?, ?, ?, ?);",
                          [date, books[i], amount[i], req.body.sel_address, req.body.sel_card, user],
                          (err, res, fld) => {
                            if (err) {
                              throw err;
                            }
                          }
                        )
                      }
                      res.render("order_cart_complete", { date: date, book: resBook, amount: amount, address: resAddress[0], card: resCard[0], signinStatus: true });
                      connection.query(
                        "DELETE FROM cart WHERE id IN (?);",
                        [cartid],
                        (err, res, fld) => {
                          if (err) {
                            throw err;
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
  } else
    res.send(
      "<script>alert('잘못된 접근입니다.'); location.href='/';</script>"
    );
});

module.exports = router;

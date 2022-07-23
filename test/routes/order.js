const e = require("express");
var express = require("express");
var router = express.Router();
var connection = require("../db/db");

router.get("/", (req, res) => {
  res.send("<script>alert('잘못된 접근입니다.'); location.href='/';</script>");
});

router.post("/", (req, res) => {
  var code =
    req.body.card1 +
    "-" +
    req.body.card2 +
    "-" +
    req.body.card3 +
    "-" +
    req.body.card4;
  var validity = req.body.month + "/" + req.body.year;
  var type = "credit";
  var user = req.session.uid;
  connection.query(
    "INSERT INTO card VALUES (null, ?, ?, ?, ?);",
    [validity, code, type, user],
    (err1, res1, fld1) => {
      if (err1) {
        if (err1.errno == 1062) {
          console.log("이미 등록된 카드입니다.");
          res.send(
            "<script>alert('이미 등록된 카드입니다.'); location.href='/card';</script>"
          );
          res.render("card");
          throw err1;
        }
        throw err1;
      } else {
        res.send(
          "<script>alert('추가되었습니다.'); location.href='/card';</script>"
        );
      }
    }
  );
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

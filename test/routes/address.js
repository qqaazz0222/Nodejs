const e = require("express");
var express = require("express");
var router = express.Router();
var connection = require("../db/db");

router.get("/", (req, res) => {
  if (req.session.uid) {
    console.log(req.session.uid);
    connection.query(
      "SELECT * FROM address WHERE userid=?;",
      [req.session.uid],
      (err1, res1, fld1) => {
        if (err1) {
          throw err1;
        } else {
          res.render("address", {
            address: res1,
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

router.post("/add", (req, res) => {
  var zipcode = req.body.zipcode;
  var main = req.body.main;
  var detail = req.body.detail;
  var user = req.session.uid;
  connection.query(
    "INSERT INTO address VALUES (null, ?, ?, ?, ?);",
    [zipcode, main, detail, user],
    (err1, res1, fld1) => {
      if (err1) {
        if (err1.errno == 1062) {
          console.log("이미 등록된 주소입니다.");
          res.render("address");
          throw err1;
        }
        throw err1;
      } else {
        res.redirect("/address");
      }
    }
  );
});

router.post("/modify/:id", (req, res) => {
  var zipcode = req.body.zipcode;
  var main = req.body.main;
  var detail = req.body.detail;
  connection.query(
    "UPDATE address SET zipcode=?, main=?, detail=? WHERE id = ?;",
    [zipcode, main, detail, req.params.id],
    (err1, res1, fld1) => {
      if (err1) {
        throw err1;
      } else {
        res.send(
          "<script>alert('수정되었습니다.'); location.href='/address';</script>"
        );
      }
    }
  );
});

router.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM address WHERE id=?;",
    [req.params.id],
    (err1, res1, fld1) => {
      if (err1) {
        throw err1;
      } else {
        res.send(
          "<script>alert('삭제되었습니다.'); location.href='/address';</script>"
        );
      }
    }
  );
});

module.exports = router;

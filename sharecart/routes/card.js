const express = require("express");
const router = express.Router();
const connection = require("../db/db");
const pool = require("../db/pool");

router.get("/", async(req, res) => {
    try {
        const card = await pool.query("SELECT * FROM card WHERE userid=?;", [req.session.uid]);
        res.render("card", {
            card: card[0],
            num: card[0].length,
            signinStatus: true,
        });
    } catch (error) {
        return res.redirect("/card");
    }
    // [수정] connection -> pool 변경
    // if (req.session.uid) {
    //     connection.query(
    //         "SELECT * FROM card WHERE userid=?;",
    //         [req.session.uid],
    //         (err1, res1, fld1) => {
    //             try {
    //                 res.render("card", {
    //                     card: res1,
    //                     num: res1.length,
    //                     signinStatus: true,
    //                 });
    //             } catch (err1) {
    //                 throw err1;
    //             }
    //         }
    //     );
    // } else {
    //     res.send(
    //         "<script>alert('로그인이 필요합니다.'); location.href='/';</script>"
    //     );
    // }
});

router.post("/add", async(req, res) => {
    try {
        const code =
            req.body.card1 +
            "-" +
            req.body.card2 +
            "-" +
            req.body.card3 +
            "-" +
            req.body.card4;
        const validity = req.body.month + "/" + req.body.year;
        const type = "credit";
        const user = req.session.uid;
        const card = await pool.query("INSERT INTO card VALUES (null, ?, ?, ?, ?);", [validity, code, type, user]);
        res.send(
            "<script>alert('추가되었습니다.'); location.href='/card';</script>"
        );
    } catch (error) {
        return res.redirect("/card");
    }
    // [수정] connection -> pool 변경
    // connection.query(
    //     "INSERT INTO card VALUES (null, ?, ?, ?, ?);",
    //     [validity, code, type, user],
    //     (err1, res1, fld1) => {
    //         try {
    //             res.send(
    //                 "<script>alert('추가되었습니다.'); location.href='/card';</script>"
    //             );
    //         } catch (err1) {
    //             if (err1.errno == 1062) {
    //                 console.log("이미 등록된 카드입니다.");
    //                 res.send(
    //                     "<script>alert('이미 등록된 카드입니다.'); location.href='/card';</script>"
    //                 );
    //                 res.render("card");
    //                 throw err1;
    //             }
    //             throw err1;
    //         }
    //     }
    // );
});

router.post("/modify/:id", async(req, res) => {
    try {
        const code =
            req.body.card1 +
            "-" +
            req.body.card2 +
            "-" +
            req.body.card3 +
            "-" +
            req.body.card4;
        const validity = req.body.month + "/" + req.body.year;
        const type = "credit";
        const user = req.session.uid;
        const card = await pool.query("UPDATE card SET validity=?, code=? WHERE id = ?;", [validity, code, req.params.id]);
        res.send(
            "<script>alert('수정되었습니다.'); location.href='/card';</script>"
        );
    } catch (error) {
        return res.redirect("/card");
    }
    // [수정] connection -> pool 변경
    // connection.query(
    //     "UPDATE card SET validity=?, code=? WHERE id = ?;",
    //     [validity, code, req.params.id],
    //     (err1, res1, fld1) => {
    //         try {
    //             res.send(
    //                 "<script>alert('수정되었습니다.'); location.href='/card';</script>"
    //             );
    //         } catch (err1) {
    //             throw err1;
    //         }
    //     }
    // );
});

router.post("/delete/:id", async(req, res) => {
    try {
        const card = await pool.query("DELETE FROM card WHERE id=?;", [req.params.id]);
        res.send(
            "<script>alert('삭제되었습니다.'); location.href='/card';</script>"
        );
    } catch (error) {
        return res.redirect("/card");
    }
    // [수정] connection -> pool 변경
    // connection.query(
    //     "DELETE FROM card WHERE id=?;",
    //     [req.params.id],
    //     (err1, res1, fld1) => {
    //         try {
    //             res.send(
    //                 "<script>alert('삭제되었습니다.'); location.href='/card';</script>"
    //             );
    //         } catch (err1) {
    //             throw err1;
    //         }
    //     }
    // );
});

module.exports = router;

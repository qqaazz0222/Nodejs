const express = require("express");
const router = express.Router();
const connection = require("../db/db");
const pool = require("../db/pool");

router.get("/", async (req, res) => {
    try {
        if (req.session.uid) {
            const address = await pool.query(
                "SELECT * FROM address WHERE userid=?;",
                [req.session.uid]
            );
            res.render("address", {
                address: address[0],
                num: address[0].length,
                signinStatus: true,
            });
        } else {
            res.send(
                "<script>alert('로그인이 필요합니다.'); location.href='/';</script>"
            );
        }
    } catch (error) {
        return res.redirect("/address");
    }
    // [수정] connection -> pool 변경
    // if (req.session.uid) {
    //     connection.query(
    //         "SELECT * FROM address WHERE userid=?;",
    //         [req.session.uid],
    //         (err1, res1, fld1) => {
    //             try {
    //                 res.render("address", {
    //                     address: res1,
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

router.post("/add", async (req, res) => {
    try {
        const user = req.session.uid;
        const { zipcode, main, detail } = req.body;
        const address = await pool.query(
            "INSERT INTO address VALUES (null, ?, ?, ?, ?);",
            [zipcode, main, detail, user]
        );
        res.redirect("/address");
    } catch (error) {
        console.log(error);
        return res.redirect("/address");
    }
    // [수정] connection -> pool 변경
    // connection.query(
    //     "INSERT INTO address VALUES (null, ?, ?, ?, ?);",
    //     [zipcode, main, detail, user],
    //     (err1, res1, fld1) => {
    //         try {
    //             res.redirect("/address");
    //         } catch (err1) {
    //             if (err1.errno == 1062) {
    //                 console.log("이미 등록된 주소입니다.");
    //                 res.render("address");
    //                 throw err1;
    //             }
    //             throw err1;
    //         }
    //     }
    // );
});

router.post("/modify/:id", async (req, res) => {
    try {
        const { zipcode, main, detail } = req.body;
        const address = await pool.query(
            "UPDATE address SET zipcode=?, main=?, detail=? WHERE id = ?;",
            [zipcode, main, detail, req.params.id]
        );
        res.send(
            "<script>alert('수정되었습니다.'); location.href='/address';</script>"
        );
    } catch (error) {
        console.log(error);
        return res.redirect("/address");
    }
    // [수정] connection -> pool 변경
    // connection.query(
    //     "UPDATE address SET zipcode=?, main=?, detail=? WHERE id = ?;",
    //     [zipcode, main, detail, req.params.id],
    //     (err1, res1, fld1) => {
    //         try {
    //             res.send(
    //                 "<script>alert('수정되었습니다.'); location.href='/address';</script>"
    //             );
    //         } catch (err1) {
    //             throw err1;
    //         }
    //     }
    // );
});

router.post("/delete/:id", async (req, res) => {
    try {
        const address = await pool.query("DELETE FROM address WHERE id=?;", [
            req.params.id,
        ]);
        res.send(
            "<script>alert('삭제되었습니다.'); location.href='/address';</script>"
        );
    } catch (error) {
        console.log(error);
        return res.redirect("/address");
    }
    // [수정] connection -> pool 변경
    // connection.query(
    //     "DELETE FROM address WHERE id=?;",
    //     [req.params.id],
    //     (err1, res1, fld1) => {
    //         try {
    //             res.send(
    //                 "<script>alert('삭제되었습니다.'); location.href='/address';</script>"
    //             );
    //         } catch (err1) {
    //             throw err1;
    //         }
    //     }
    // );
});

module.exports = router;

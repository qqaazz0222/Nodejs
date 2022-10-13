const express = require("express");
const router = express.Router();
const connection = require("../db/db");
const pool = require("../db/pool");

router.get("/", async (req, res) => {
    try {
        if (req.session.uid) {
            const cart = await pool.query(
                "SELECT cart.id, itemid, cart.amount, books.id AS bookid, books.title AS title, books.price AS price FROM cart JOIN books WHERE itemid = books.id AND userid = ?;",
                [req.session.uid]
            );
            res.render("cart", {
                order: cart[0],
                signinStatus: true,
            });
        } else {
            res.send(
                "<script>alert('로그인이 필요합니다.'); location.href='/';</script>"
            );
        }
    } catch (error) {
        return res.redirect("/cart");
    }
    // [수정] connection -> pool 변경
    // if (req.session.uid) {
    //     connection.query(
    //         "SELECT cart.id, itemid, cart.amount, books.id AS bookid, books.title AS title, books.price AS price FROM cart JOIN books WHERE itemid = books.id AND userid = ?;",
    //         [req.session.uid],
    //         (err1, res1, fld1) => {
    //             try {
    //                 console.log(res1);
    //                 res.render("cart", {
    //                     order: res1,
    //                     signinStatus: true,
    //                 });
    //             } catch {
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

router.post("/", async (req, res) => {
    try {
        if (req.session.uid) {
            const book = {
                id: req.body.bookid,
                title: req.body.booktitle,
                price: req.body.bookprice,
            };
            const amount = req.body.amount;
            const cart = await pool.query(
                "INSERT INTO cart VALUES (null, ?, ?, ?);",
                [book.id, amount, req.session.uid]
            );
            res.redirect("/");
        } else {
            res.send(
                "<script>alert('잘못된 접근입니다.'); location.href='/';</script>"
            );
        }
    } catch (error) {
        return res.redirect("/cart");
    }
    // [수정] connection -> pool 변경
    // if (req.session.uid) {
    //     var book = {
    //         id: req.body.bookid,
    //         title: req.body.booktitle,
    //         price: req.body.bookprice,
    //     };
    //     var amount = req.body.amount;
    //     connection.query(
    //         "INSERT INTO cart VALUES (null, ?, ?, ?);",
    //         [book.id, amount, req.session.uid],
    //         (err1, res1, fld1) => {
    //             try {
    //                 res.redirect("/");
    //             } catch (err1) {
    //                 throw err1;
    //             }
    //         }
    //     );
    // } else {
    //     res.send(
    //         "<script>alert('잘못된 접근입니다.'); location.href='/';</script>"
    //     );
    // }
});

router.post("/modify/:id", async (req, res) => {
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
        const cart = await pool.query(
            "UPDATE card SET validity=?, code=? WHERE id = ?;",
            [validity, code, req.params.id]
        );
        res.send(
            "<script>alert('수정되었습니다.'); location.href='/card';</script>"
        );
    } catch (error) {
        return res.redirect("/cart");
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

router.post("/delete/:id", async (req, res) => {
    try {
    } catch (error) {
        return res.redirect("/cart");
    }
    // [수정] connection -> pool 변경
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

const express = require("express");
const router = express.Router();
const connection = require("../db/db");
const pool = require("../db/pool");

router.get("/", async (req, res) => {
    try {
        if (req.session.uid) {
            const cartlist = await pool.query(
                "SELECT targetcart FROM cartlist WHERE uid = ?",
                [req.session.uid]
            );
            const cartvalue = await pool.query(
                "SELECT * FROM cartvalue WHERE cartid = ?",
                [cartlist[0][0].targetcart]
            );
            console.log(cartvalue[0]);
            res.render("cart", {
                order: cartvalue[0],
                signinStatus: true,
            });
        } else {
            res.send(
                "<script>alert('로그인이 필요합니다.'); location.href='/';</script>"
            );
        }
    } catch (error) {
        return res.redirect("/");
    }
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
            const cartlist = await pool.query(
                "SELECT * FROM cartlist WHERE uid = ?",
                [req.session.uid]
            );
            console.log(cartlist[0].length);
            if (cartlist[0].length == 0) {
                const create_cartlist = await pool.query(
                    "INSERT INTO cartlist VALUES (null, ?, ?);",
                    [req.session.uid + "_C", req.session.uid]
                );
            }
            const cartvalue = await pool.query(
                "INSERT INTO cartvalue VALUES (null, ?, ?, ?);",
                [book.id, amount, req.session.uid + "_C"]
            );
            console.log("추가");
            res.redirect("/");
        } else {
            res.send(
                "<script>alert('잘못된 접근입니다.'); location.href='/';</script>"
            );
        }
    } catch (error) {
        return res.redirect("/cart");
    }
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
});

router.post("/delete/:id", async (req, res) => {
    try {
    } catch (error) {
        return res.redirect("/cart");
    }
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

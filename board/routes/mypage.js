const express = require("express");
const router = express.Router();
const connection = require("../db/db");
const pool = require("../db/pool");

router.get("/", async(req, res) => {
    try {
        if (req.session.uid) {
            const user = await pool.query("SELECT * FROM orders JOIN books, address, card WHERE order_item = books.id and address_id = address.id and card_id = card.id and user_id = ?;", [req.session.uid]);
            const orders = await pool.query("SELECT * FROM orders JOIN books, address, card WHERE order_item = books.id and address_id = address.id and card_id = card.id and user_id = ?;", [req.session.uid]);
            res.render("mypage", {
                user: user[0][0],
                order: orders[0],
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
    // [수정] connection -> pool 변경
    // if (req.session.uid) {
    //     connection.query(
    //         "SELECT * FROM users WHERE id=?;",
    //         [req.session.uid],
    //         (err1, res1, fld1) => {
    //             try {
    //                 connection.query(
    //                     "SELECT * FROM orders JOIN books, address, card WHERE order_item = books.id and address_id = address.id and card_id = card.id and user_id = ?;",
    //                     [req.session.uid],
    //                     (err2, res2, fld2) => {
    //                         try {
    //                             res.render("mypage", {
    //                                 user: res1[0],
    //                                 order: res2,
    //                                 signinStatus: true,
    //                             });
    //                         } catch (err2) {
    //                             throw err2;
    //                         }
    //                     }
    //                 );
    //             } catch (err1) {
    //                 console.log(err1);
    //                 console.log(err1.message);
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

module.exports = router;

const express = require("express");
const session = require("express-session");
const router = express.Router();
const connection = require("../db/db");
const pool = require("../db/pool");
const sessionStore = require("../db/session");

router.use(
    session({
        secret: "sessionkey",
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
    })
);

router.get("/", async (req, res) => {
    try {
        const books = await pool.query("SELECT * FROM books");
        if (req.session.uid) {
            res.render("index", {
                books: books[0],
                num: books[0].length,
                signinStatus: true,
            });
        } else {
            res.render("index", {
                books: books[0],
                num: books[0].length,
                signinStatus: false,
            });
        }
    } catch (error) {
        return res.redirect("/");
    }
    // [수정] connection -> pool 변경
    // connection.query("SELECT * FROM books;", (err1, res1, fld1) => {
    //     try {
    //         if (req.session.uid) {
    //             res.render("index", {
    //                 books: res1,
    //                 num: res1.length,
    //                 signinStatus: true,
    //             });
    //         } else {
    //             res.render("index", {
    //                 books: res1,
    //                 num: res1.length,
    //                 signinStatus: false,
    //             });
    //         }
    //     } catch (err1) {
    //         throw err1;
    //     }
    // });
});

router.get("/book/:id", async (req, res) => {
    try {
        if (req.session.uid) {
            const book = await pool.query("SELECT * FROM books WHERE id=?", [
                req.params.id,
            ]);
            res.render("book", {
                bookid: req.params.id,
                book: book[0][0],
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
    //         "SELECT * FROM books WHERE id=?;",
    //         [req.params.id],
    //         (err1, res1, fld1) => {
    //             try {
    //                 res.render("book", {
    //                     bookid: req.params.id,
    //                     book: res1[0],
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
module.exports = router;

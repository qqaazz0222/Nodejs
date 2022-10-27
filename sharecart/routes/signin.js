const express = require("express");
const router = express.Router();
const connection = require("../db/db");
const pool = require("../db/pool");

router.get("/", (req, res) => {
    try {
        if (req.session.uid) {
            delete req.session.uid;
            delete req.session.isLogined;
            delete req.session.author_id;
            req.session.save(function () {
                res.redirect("/");
            });
        } else {
            res.render("signin");
        }
    } catch (error) {
        return res.redirect("/");
    }
});

router.post("/", async(req, res) => {
    try {
        const id = req.body.id;
        const pw = req.body.pw;
        const user = await pool.query("SELECT * FROM users WHERE id=?;",[id]);
        if (user[0].length > 0) {
            if (pw === user[0][0].pw) {
                console.log("로그인 성공");
                req.session.uid = user[0][0].id;
                req.session.author_id = user[0][0].author_id;
                req.session.isLogined = true;
                req.session.save(function () {
                    res.redirect("../");
                });
            } else {
                console.log("비밀번호 불일치");
                res.redirect("/signin");
            }
        } else {
            console.log("아이디 불일치");
            res.redirect("/signin");
        }
    } catch (error) {
        
    }
// [수정] connection -> pool 변경
//     connection.query(
//         "SELECT * FROM users WHERE id=?;",
//         [id],
//         (err1, res1, fld1) => {
//             try {
//                 if (res1.length > 0) {
//                     if (pw === res1[0].pw) {
//                         console.log("로그인 성공");
//                         req.session.uid = res1[0].id;
//                         req.session.author_id = res1[0].author_id;
//                         req.session.isLogined = true;
//                         req.session.save(function () {
//                             res.redirect("../");
//                         });
//                     } else {
//                         console.log("비밀번호 불일치");
//                         res.redirect("/");
//                     }
//                 } else {
//                     console.log("아이디 불일치");
//                     res.redirect("/");
//                 }
//             } catch (err1) {
//                 throw err1;
//             }
//         }
//     );
});

module.exports = router;

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
            res.render("signup", { signinStatus: true });
        }
    } catch (error) {
        return res.redirect("/");
    }
});

router.post("/", async(req, res) => {
    try {
        const id = req.body.id;
        const pw = req.body.pw;
        const name = req.body.name;
        const user = await pool.query("INSERT INTO users VALUES (?, ?, ?);", [id, pw, name]);
        res.render("signup_complete", {
            signinStatus: false,
            name: name,
        });
    } catch (error) {
        
    }
// [수정] connection -> pool 변경
//     connection.query(
//         "INSERT INTO users VALUES (?, ?, ?);",
//         [id, pw, name],
//         (err1, res1, fld1) => {
//             try {
//                 res.render("signup_complete", {
//                     signinStatus: false,
//                     name: name,
//                 });
//             } catch (err1) {
//                 if (err1.errno == 1062) {
//                     res.render("signup");
//                     throw err1;
//                 }
//                 throw err1;
//             }
//         }
//     );
});

module.exports = router;

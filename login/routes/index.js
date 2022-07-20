const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('../middleware/db');
const saltRounds = 10;


router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Express' });
});


router.get('/login', (req, res) => {
  res.render('login');
})

// router.post('/register', (req, res, next) => {
//   const param = [req.body.id, req.body.pw, req.body.name];
//   bcrypt.hash(param[1], saltRounds, (err, hash) => {
//     connection.query('INSERT INTO users(`id`,`pw`,`name`) VALUES (?,?,?)', param, (err, row) => {
//       if(err) console.log(err);
//     });
//   });
//   res.end();
// })


module.exports = router;

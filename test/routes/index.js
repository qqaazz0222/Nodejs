const e = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../db/db');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', (req, res) => {
  var id = req.body.id;
  var pw = req.body.pw;
  res.send(`id : ${id}, pw : ${pw}`);
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  var id = req.body.id;
  var pw = req.body.pw;
  var name = req.body.name;
  connection.query('INSERT INTO users VALUES (?, ?, ?);', [id, pw, name], (err1, res1, fld1) => {
    if(err1) {
      if(err1.errno==1062) {
        console.log('이미 등록된 아이디입니다.');
        res.render('signup');
        throw err1;
      }
      throw err1;
    }
    else{
      res.render('signup_complete', { name: name });
    }
  })
});



module.exports = router;

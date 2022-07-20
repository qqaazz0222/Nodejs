var express = require('express');
var router = express.Router();
var connection = require('../db/db');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.post('/signin', (req, res, next) => {
  var id = req.body.id;
  var pw = req.body.pw;
  res.send(`id : ${id}, pw : ${pw}`);
  // res.json(req.body);
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) => {
  var id = req.body.id;
  var pw = req.body.pw;
  var name = req.body.name;
  var temp_id = '';
  connection.query('SELECT id FROM users WHERE id = ?;', [id], (err, res, fld) => {
    if(err) throw err;
    temp_id = res[0].id;
    console.log(`res : ${res[0].id}`);
  })
  console.log(`temp_id : ${temp_id}`);
  console.log(`id : ${id}`);
  if(id == temp_id) {
    console.log('중복된 아이디 입력');
  }
  else {
    connection.query('INSERT INTO users VALUES ( ?, ?, ?);', [id, pw, name], (err, res, fld) => {
      if(err) throw err;
      console.log(res);
    })
    res.render('signup_complete', { name: name });
  }
});



module.exports = router;

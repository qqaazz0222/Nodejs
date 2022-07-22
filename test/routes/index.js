const e = require('express');
var express = require('express');
var router = express.Router();
var connection = require('../db/db');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options ={
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '11111111',
    database: 'board'
};
var sessionStore = new MySQLStore(options);

router.use(session({
  secret:"asdfasffdas",
  resave:false,
  saveUninitialized:true,
  store: sessionStore
}));

router.get('/', (req, res) => {
  connection.query('SELECT * FROM books;', (err1, res1, fld1) => {
    if(err1) {
      throw err1;
    }
    else{
      if(req.session.uid) {
        res.render('index', {books: res1, num: res1.length, signinStatus: true });
      } else {
        res.render('index', {books: res1, num: res1.length, signinStatus: false });
      }
    }
  })
});

router.get('/book/:id', (req, res) => {
  if(req.session.uid) {
    connection.query('SELECT * FROM books WHERE id=?;',[req.params.id], (err1, res1, fld1) => {
      if(err1) {
        throw err1;
      }
      else{
        res.render('book', { book: res1[0], signinStatus: true });
      }
    })
  } else {
    res.send("<script>alert('로그인이 필요합니다.'); location.href='/';</script>");
  }
  
});

router.get('/signin', (req, res) => {
  if(req.session.uid) {
    delete req.session.uid;
    delete req.session.isLogined;
    delete req.session.author_id;
    req.session.save(function(){
        res.redirect('/');
    });
  } else {
    res.render('signin');
  }
});

router.post('/signin', (req, res) => {
  var id = req.body.id;
  var pw = req.body.pw;
  connection.query('SELECT * FROM users WHERE id=?;', [id], (err1, res1, fld1) => {
    if(err1) {
      throw err1;
    }
    else{
      if(res1.length > 0) {
        if(pw === res1[0].pw ) {
          console.log('로그인 성공');
          req.session.uid = res1[0].id;
          req.session.author_id = res1[0].author_id;
          req.session.isLogined = true;
          req.session.save(function(){
            res.redirect('/');
          });

        } else {
          console.log('비밀번호 불일치');
          res.redirect('/signin');
        }
      } else {
        console.log('아이디 불일치');
        res.redirect('/signin');
      }
    }
  })
});

router.get('/signup', (req, res) => {
  if(req.session.uid) {
    delete req.session.uid;
    delete req.session.isLogined;
    delete req.session.author_id;
    req.session.save(function(){
        res.redirect('/', { signinStatus: false });
    });
  } else {
    res.render('signup', { signinStatus: true });
  }
});

router.post('/signup', (req, res) => {
  var id = req.body.id;
  var pw = req.body.pw;
  var name = req.body.name;
  connection.query('INSERT INTO users VALUES (?, ?, ?);', [id, pw, name], (err1, res1, fld1) => {
    if(err1) {
      if(err1.errno == 1062) {
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

router.get('/mypage', (req, res) => {
  if(req.session.uid) {
    console.log(req.session.uid);
    connection.query('SELECT * FROM users WHERE id=?;',[req.session.uid], (err1, res1, fld1) => {
      if(err1) {
        throw err1;
      }
      else{
        res.render('mypage', { user: res1[0], signinStatus: true });
      }
    })
  } else {
    res.send("<script>alert('로그인이 필요합니다.'); location.href='/';</script>");
  }
});

router.get('/address', (req, res) => {
  if(req.session.uid) {
    console.log(req.session.uid);
    connection.query('SELECT * FROM address WHERE userid=?;',[req.session.uid], (err1, res1, fld1) => {
      if(err1) {
        throw err1;
      }
      else{
        res.render('address', { address: res1, num: res1.length, signinStatus: true });
      }
    })
  } else {
    res.send("<script>alert('로그인이 필요합니다.'); location.href='/';</script>");
  }
});

router.post('/address', (req, res) => {
  var zipcode = req.body.zipcode;
  var main = req.body.main;
  var detail = req.body.detail;
  var user = req.session.uid
  connection.query('INSERT INTO address VALUES (null, ?, ?, ?, ?);', [zipcode, main, detail, user], (err1, res1, fld1) => {
    if(err1) {
      if(err1.errno == 1062) {
        console.log('이미 등록된 주소입니다.');
        res.render('address');
        throw err1;
      }
      throw err1;
    }
    else{
      res.redirect('address');
    }
  })
});

router.post('/address/modify/:id', (req, res) => {
  var zipcode = req.body.zipcode;
  var main = req.body.main;
  var detail = req.body.detail;
  connection.query('UPDATE address SET zipcode=?, main=?, detail=? WHERE id = ?;', [zipcode, main, detail, req.params.id], (err1, res1, fld1) => {
    if(err1) {
      throw err1;
    }
    else{
      res.redirect('../../address');
    }
  })
});

router.post('/address/delete/:id', (req, res) => {
  connection.query('DELETE FROM address WHERE id=?;', [req.params.id], (err1, res1, fld1) => {
    if(err1) {
      throw err1;
    }
    else{
      res.redirect('../../address');
    }
  })
});

router.get('/card', (req, res) => {
  if(req.session.uid) {
    console.log(req.session.uid);
    connection.query('SELECT * FROM card WHERE userid=?;',[req.session.uid], (err1, res1, fld1) => {
      if(err1) {
        throw err1;
      }
      else{
        res.render('card', { card: res1, num: res1.length, signinStatus: true });
      }
    })
  } else {
    res.send("<script>alert('로그인이 필요합니다.'); location.href='/';</script>");
  }
});

router.post('/card', (req, res) => {
  var code = req.body.card1 + "-" + req.body.card2 + "-" + req.body.card3 + "-" + req.body.card4;
  var validity = req.body.month + "/" + req.body.year;
  var type = "credit";
  var user = req.session.uid;
  connection.query('INSERT INTO card VALUES (null, ?, ?, ?, ?);', [validity, code, type, user], (err1, res1, fld1) => {
    if(err1) {
      if(err1.errno == 1062) {
        console.log('이미 등록된 카드입니다.');
        res.render('card');
        throw err1;
      }
      throw err1;
    }
    else{
      res.redirect('card');
    }
  })
});

router.post('/card/modify/:id', (req, res) => {
  var code = req.body.card1 + "-" + req.body.card2 + "-" + req.body.card3 + "-" + req.body.card4;
  var validity = req.body.month + "/" + req.body.year;
  connection.query('UPDATE card SET validity=?, code=? WHERE id = ?;', [validity, code, req.params.id], (err1, res1, fld1) => {
    if(err1) {
      throw err1;
    }
    else{
      res.redirect('../../card');
    }
  })
});

router.post('/card/delete/:id', (req, res) => {
  connection.query('DELETE FROM card WHERE id=?;', [req.params.id], (err1, res1, fld1) => {
    if(err1) {
      throw err1;
    }
    else{
      res.redirect('../../card');
    }
  })
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.session.user) {
    res.send('login');
  } else {
    res.send('no login');
  }
});

router.post('/login', function (req, res, next) {
  console.log(req.session);
  req.session.user = req.body.user;
  res.cookie('name', req.body.user);
  res.send(req.session.user);
});

module.exports = router;

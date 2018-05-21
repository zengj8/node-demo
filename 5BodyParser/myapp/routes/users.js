let express = require('express');
let router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log(req.body); // => { 'info[name]': 'henry','info[age]': '30','hobby[1]': 'sport','hobby[2]': 'coding' }
  res.send('respond with a resource');
});

module.exports = router;

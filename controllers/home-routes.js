const router = require('express').Router();

let session = {
  loggedIn: false
}

router.get('/', function (req, res) {

  res.render('home',{
    session
  });
});


module.exports = router;
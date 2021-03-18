const router = require('express').Router();

let post = {
  loggedIn: true
}

router.get('/', function (req, res) {

  res.render('home',{
    post
  });
});


module.exports = router;
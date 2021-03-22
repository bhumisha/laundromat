const router = require('express').Router();

// const fetch = require("node-fetch");

router.get('/', function (req, res) {

  res.render('home',{
    loggedIn: req.session.loggedIn
  })
});

module.exports = router;
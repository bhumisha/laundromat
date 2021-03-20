const router = require('express').Router();
const fetch = require("node-fetch");

let session = {
  loggedIn: false
}
let hopeful = {};
router.get('/', function (req, res) {

  res.render('home',{
    session
  })
});


module.exports = router;
const router = require('express').Router();
const fetch = require("node-fetch");

let session = {
  loggedIn: false
}
let hopeful = {};
router.get('/', function (req, res) {

  fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyBz7e4X_piywmlaQOSdB4DPoaqq6PI9lfk')

    .then(res =>res.json())
    .then(data => hopeful = data)
    .then(console.log(hopeful))
    .then(
  res.render('home',{
    session
  }))
});


module.exports = router;
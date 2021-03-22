const router = require('express').Router();

const sequelize = require('../config/connection');
const { Customers, Laundromats, Locations, Orders } = require('../models');


let session = {
  loggedIn: false
}

router.get('/placeorder', (req, res) => {
  res.render('placeorder');
});

//This is to render the Login Dashboard
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('home');
});

module.exports = router;
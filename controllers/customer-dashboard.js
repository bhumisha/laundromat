const router = require('express').Router();

const sequelize = require('../config/connection');
const { Customers, Laundromats, Locations, Orders } = require('../models');


let session = {
  loggedIn: false
}


// get all posts for dashboard
// router.get('/', withAuth, (req, res) => {
//   console.log(req.session);
//   console.log('======================');
//   Orders.findAll({
//     where: {
//       customer_id: req.session.customer_id
//     },
//     attributes: [
//       'id',
//       'order_date',
//       'order_status'
//     ] 
//   })
//     .then(dbOrdersData => {
//       const orders = dbOrdersData.map(order => order.get({ plain: true }));
//       res.render('cust_dashboard', { orders, loggedIn: true }); // Here we are loading orders which are placed by logged in customer.
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


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
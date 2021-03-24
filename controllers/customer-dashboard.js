const router = require('express').Router();

const sequelize = require('../config/connection');
const {
  Customers,
  Laundromats,
  Locations,
  Orders
} = require('../models');
const {
  withAuth,
  withAdminAuth
} = require('../utils/auth');

// get all posts for dashboard
// router.get('/', withAuth, (req, res) => {
//   console.log("Session : ", req.session);
//   console.log('======================');
//   Orders.findAll({
//       where: {
//         customer_id: req.session.customer_id
//       },
//       attributes: [
//         'id',
//         'order_date',
//         'order_type',
//         'order_status',
//         'comments',
//         'bags',
//         'laundromat_id',
//       ],
//       include: [{
//           model: Customers,
//           attributes: ['id', 'name', 'email', 'phone', 'street_address', 'city', 'state', 'zipcode'],
//         }

//       ]
//     })
//     .then(dbOrdersData => {
//       const orders = dbOrdersData.map(order => order.get({
//         plain: true
//       }));
//       console.log("Orders From Cust", orders);

//       res.render('cust-order', {
//         orders,
//         loggedIn: true
//       }); // Here we are loading orders which are placed by logged in customer.
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


//-------This get route gets the adress from the customer instead of the address of the order-----

router.get('/', withAuth, (req, res) => {
  console.log("Session : ", req.session);
  console.log('======================');
  Customers.findOne({
      where: {
        id: req.session.customer_id
      },
      attributes: [
        'id', 
        'name', 
        'email', 
        'phone', 
        'street_address', 
        'city', 
        'state', 
        'zipcode'
      ],
      include: [{
          model: Orders,
          attributes: [
            'id',
            'order_date',
            'order_type',
            'order_status',
            'comments',
            'bags',
            'laundromat_id',
          ],
        }

      ]
    })
    .then(dbData => {
      let orders;
      if (!dbData) {
        res.status(404).json({
          message: 'No customer found with this id'
        });
        return;
      }
      orders = dbData.get({
        plain: true
      });
      // console.log("Orders From Cust", orders);

      res.render('cust-order', {
        orders,
        loggedIn: true
      }); // Here we are loading orders which are placed by logged in customer.
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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
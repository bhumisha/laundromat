const router = require('express').Router();
const sequelize = require('../config/connection');
const { Customers, Laundromats, Locations, Orders } = require('../models');
const {withAuth,withAdminAuth }= require('../utils/auth');



//Get all the Orders information when Laundromat login and load Order Home page..
router.get('/orders', withAdminAuth,(req, res) => {
  console.log('======================');
  console.log("Session : " ,req.session);
  Orders.findAll({
    where: {
      laundromat_id: req.session.laundromat_id
      },
    attributes: [
      'id',
      'order_date',
      'order_status',
      'customer_id'

    ],
    include: [
      {
        model: Customers,
        attributes: ['id', 'name', 'email', 'phone','street_address',  'city', 'state','zipcode'],
      }
      
    ]
  })
  .then(dbOrdersData => {
    // res.json(dbOrdersData);   TWO 'RES' CALLS CAUSES AN ERROR. 
    const orders = dbOrdersData.map(order => order.get({ plain: true }));
    console.log(orders[0]);

    // if(req.session.adminLoggedIn){}

    // else{
    //   req.session.adminLoggedIn = false;
    // }
    res.render('orders', {
      orders,
      adminLoggedIn: true
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//Get Single Order and laundromat can update status and add comment
router.get('/orders/:id', (req, res) => {
  Orders.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'order_date',
      'order_status',
    ],
    include: [
      {
        model: Customers,
        attributes: ['id', 'name', 'email', 'phone','street_address', 'zipcode', 'city', 'state','zipcode'],
      },
    ]
  })
    .then(dbOrderData => {
      if (!dbOrderData) {
        res.status(404).json({ message: 'No order found with this id' });
        return;
      }
      // res.json(dbOrderData);
      const order = dbOrderData.get({ plain: true });

      res.render('single-order', {
        order,
        adminLoggedIn: req.session.adminLoggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.adminLoggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// router.get('/signup', (req, res) => {
//   if (req.session.adminLoggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('signup');
// });


module.exports = router;
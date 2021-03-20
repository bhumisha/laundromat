const router = require('express').Router();
const sequelize = require('../config/connection');
const { Customers, Laundromats, Addresses, Orders } = require('../models');


let session = {
  loggedIn: false
}

//Get all the Orders information when Laundromat login and load Order Home page..
router.get('/', (req, res) => {
  console.log('======================');
  Orders.findAll({
    attributes: [
      'id',
      'order_date',
      'order_status'
    ],
    include: [
      {
        model: Customers,
        attributes: ['id', 'name', 'email', 'phone'],
        // include: {
        //   model: Addresses,
        //   attributes: ['id','street_address', 'house_number', 'city', 'state','zipcode','customer_id']
        // }
      },
    ]
  })
  .then(dbOrdersData => {
    console.log(dbOrdersData);
   // res.json(dbOrdersData);
    const orders = dbOrdersData.map(order => order.get({ plain: true }));
    if(req.session.loggedIn){}
    else{
      req.session.loggedIn = false;
    }
    res.render('orders', {
      orders,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//Get Single Order and laundromat can update status and add comment
router.get('/order/:id', (req, res) => {
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
        attributes: ['id', 'name', 'email', 'phone'],
        // include: {
        //   model: Addresses,
        //   attributes: ['id','street_address', 'house_number', 'city', 'state','zipcode','customer_id']
        // }
      },
    ]
  })
    .then(dbOrderData => {
      if (!dbOrderData) {
        res.status(404).json({ message: 'No order found with this id' });
        return;
      }
      //res.json(dbOrderData);
      const order = dbOrderData.get({ plain: true });

      res.render('single-order', {
        order,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/order');
    return;
  }

  res.render('login');
});

// router.get('/signup', (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   res.render('signup');
// });


module.exports = router;
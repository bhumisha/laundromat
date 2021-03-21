const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Customers, Laundromats, Locations, Orders } = require('../../models');
const {withAuth,withAdminAuth} = require('../../utils/auth');

// // get all users
// router.get('/', (req, res) => {
//   console.log('======================');
//   Orders.findAll({
//     where: {
//       laundromat_id: req.session.laundromat_id
//     },
//     attributes: [
//       'id',
//       'order_date',
//       'order_type',
//       'order_status'
//     ],
//     include: [
//       {
//         model: Customers,
//         attributes: ['id', 'name', 'email', 'phone','street_address', 'apartment_no', 'city', 'state','zip_code'],
//       },
//     ]
//   })
//     .then(dbOrdersData => res.json(dbOrdersData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });


//Get all the Orders information when Customers logined and load Order Home page..
router.get('/', (req, res) => {
  console.log('======================');
  Orders.findAll({
    where: {
      customer_id: req.session.customer_id
    },
    attributes: [
      'id',
      'order_date',
      'order_type',
      'order_status'
    ],
    include: [
      {
        model: Customers,
        attributes: ['id', 'name', 'email', 'phone','street_address', 'apartment_no', 'city', 'state','zip_code'],
      },
    ]
  })
    .then(dbOrdersData => res.json(dbOrdersData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//Get Single Order and laundromat can update status and add comment
router.get('/:id', (req, res) => {
  Orders.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'order_date',
      'order_type',
      'order_status',
    ],
    include: [
      {
        model: Customers,
        attributes: ['id', 'name', 'email', 'phone','street_address', 'apartment_no', 'city', 'state','zip_code'],
      },
    ]
  })
  .then(dbOrderData => {
    if (!dbOrderData) {
      res.status(404).json({ message: 'No order found with this id' });
      return;
    }
    res.json(dbOrderData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// router.post('/', withAuth, (req, res) => {
//   // expects {order_date: 'date', order_status: 'new', customer_id: 1}
//   Orders.create({
//     order_date: req.body.order_date,
//     order_status: "new",
//     customer_id: req.session.customer_id
//   })
//   .then(dbOrdersData => res.json(dbOrdersData))
//   .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//   });
// });


router.put('/:id', withAdminAuth, (req, res) => {
  Orders.update(
    {
      order_status: req.body.order_status
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbOrderData => {
      if (!dbOrderData) {
        res.status(404).json({ message: 'No order found with this id' });
        return;
      }
      res.json(dbOrderData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAdminAuth, (req, res) => {
  console.log('id', req.params.id);
  Orders.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbOrderData => {
      if (!dbOrderData) {
        res.status(404).json({ message: 'No order found with this id' });
        return;
      }
      res.json(dbOrderData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

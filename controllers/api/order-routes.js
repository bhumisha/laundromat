const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Customers, Laundromats, Locations, Orders } = require('../models');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Orders.findAll({
    where: {
      laundromat_id: req.session.laundromat_id
    },
    attributes: [
      'id',
      'order_date',
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


// router.put('/:id', withAuth, (req, res) => {
//   Post.update(
//     {
//       title: req.body.title,
//       content:req.body.content
//     },
//     {
//       where: {
//         id: req.params.id
//       }
//     }
//   )
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete('/:id', withAuth, (req, res) => {
//   console.log('id', req.params.id);
//   Post.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(dbPostData => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;

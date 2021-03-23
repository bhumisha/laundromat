const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Customers, Laundromats, Locations, Orders } = require('../../models');
const {withAuth,withAdminAuth} = require('../../utils/auth');


//Get all the Orders information when Customers logined and load Order Home page..
//GET CUSTOMER ORDERS -> IT WILL GET CALLED AFTER EACH OPERATION. LIKE LOGIN / CREATE / EDIT
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
        attributes: ['id', 'name', 'email', 'phone','street_address', 'city', 'state','zipcode'],
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
        attributes: ['id', 'name', 'email', 'phone','street_address',  'city', 'state','zipcode'],
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


//CREATE CUSTOMER ORDER -> IT WILL GET CALLED FROM CREATE_ORDER.JS FROM JS
router.post('/', withAuth, (req, res) => {
  // expects {order_date: 'date', order_status: 'new', customer_id: 1}
  console.log("req.session.customer_id" , req.session.customer_id);
  console.log(req);
  Orders.create({
    order_date: req.body.order_date,
    order_status: req.body.order_status,
    order_type:req.body.order_type,
    customer_id: req.session.customer_id,
    laundromat_id : "1"
  })
  .then(dbOrdersData => res.json(dbOrdersData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});



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
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
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
        attributes: ['id', 'name', 'email', 'phone','street_address',  'city', 'state','zipcode'],
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

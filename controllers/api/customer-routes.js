const router = require('express').Router();
const { Customers, Laundromats, Locations, Orders } = require('../../models');

// get all users
router.get('/', (req, res) => {
  Customers.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Customers.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Orders,
        attributes: ['id', 'order_date', 'order_status','order_type','customer_id'],
      }
    ]
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No customer found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {username: 'Lernantino',  password: 'password1234'} email,
       
  Customers.create({
    email: req.body.email,
    password: req.body.password,
    name:req.body.email,
    street_address:req.body.street_address,
    apartment_no:"2122",
    city:req.body.city,
    state:req.body.state,
    zip_code:req.body.zipcode
  })
    .then(dbData => {
      req.session.save(() => {
        req.session.customer_id = dbData.id;
        req.session.email = dbData.email;
        req.session.loggedIn = true;
        res.json(dbData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // expects { password: 'password1234'}
  Customers.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbCustData => {
    if (!dbCustData) {
      res.status(400).json({ message: 'No Customer with that email!' });
      return;
    }

    //const validPassword = dbCustData.checkPassword(req.body.password);
    const validPassword = dbCustData.password === req.body.password?true:false;
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.customer_id = dbCustData.id;
      req.session.customer_email = dbCustData.email;
      req.session.loggedIn = true;
  
      res.json({ customer : dbCustData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});


module.exports = router;
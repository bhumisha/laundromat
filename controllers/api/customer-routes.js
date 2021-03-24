const router = require('express').Router();
const {
  Customers,
  Laundromats,
  Locations,
  Orders
} = require('../../models');
const passport = require('../../config/passport');
const {
  withAuth,
  withAdminAuth
} = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  Customers.findAll({
      attributes: {
        exclude: ['password']
      },
    })
    .then((dbData) => res.json(dbData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Customers.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        id: req.params.id,
      },
      include: [{
        model: Orders,
        attributes: [
          'id',
          'order_date',
          'order_status',
          'order_type',
          'customer_id',
        ],
      }, ],
    })
    .then((dbData) => {
      if (!dbData) {
        res.status(404).json({
          message: 'No customer found with this id'
        });
        return;
      }
      res.json(dbData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // expects {username: 'Lernantino',  password: 'password1234'} email,

  Customers.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.email,
      street_address: req.body.street_address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    })
    .then(dbData => {

      if (req.session.adminLoggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      }
      req.session.save(() => {
        req.session.customer_id = dbData.id;
        req.session.email = dbData.email;
        req.session.loggedIn = true;
        res.json(dbData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/', withAuth, (req, res) => {
  // expects {username: 'Lernantino',  password: 'password1234'} email,    
  Customers.update({
      street_address: req.body.street_address,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    }, {
      where: {
        id: req.session.customer_id
      }
    })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({
          message: 'No post found with this id'
        });
        return;
      }
      res.json(dbData);
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
    })
    .then(dbCustData => {

      if (!dbCustData) {
        res.status(400).json({
          message: 'No Customer with that email!'
        });
        return;
      }

      const validPassword = dbCustData.checkPassword(req.body.password);
      // const validPassword = dbCustData.password === req.body.password?true:false;

      if (!validPassword) {
        res.status(400).json({
          message: 'Incorrect password!'
        });
        return;
      }

      req.session.save(() => {
        req.session.customer_id = dbCustData.id;
        req.session.customer_email = dbCustData.email;
        req.session.loggedIn = true;

        res.json({
          customer: dbCustData,
          message: 'You are now logged in!'
        });
      });
    });
});

router.post('/login', function (req, res) {
  /* look at the 2nd parameter to the below call */
  passport.authenticate('local', function (err, dbCustData, info) {
    if (err) {
      return res.status(500).send();
    }
    if (!dbCustData && info) {
      return res.status(401).send(info);
    }
    if (req.session.adminLoggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    req.session.save(() => {
      req.session.customer_id = dbCustData.id;
      req.session.customer_email = dbCustData.email;
      req.session.loggedIn = true;

      res.json({
        customer: dbCustData,
        message: 'You are now logged in!'
      });
    });
  })(req, res);
});



router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
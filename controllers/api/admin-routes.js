const router = require('express').Router();
const { Customers, Laundromats, Locations, Orders } = require('../../models');

// get all users
router.get('/', (req, res) => {
  Laundromats.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Laundromats.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Locations,
        attributes: ['id', 'street_address',  'city', 'state','zipcode']
      },
      {
        model: Orders,
        attributes: ['id', 'order_date', 'order_status','order_type','customer_id'],
        include: {
          model: Customers,
          attributes: ['name','email']
        }
      }
    ]
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No laundormat found with this id' });
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
  // expects {username: 'Lernantino',  password: 'password1234'}
  Laundromats.create({
    name:req.body.business,
    email: req.body.email,
    password: req.body.password,
    locations: [{
      street_address: req.body.street_address,
      city:  req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode
    }]
  },
  {
    include: [ Locations ]
  })
    .then(dbData => {
      req.session.save(() => {
        req.session.laundromat_id = dbData.id;
        req.session.laundromat_email = dbData.email;
        req.session.adminLoggedIn = true;
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
  Laundromats.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbLaundromatData => {
    if (!dbLaundromatData) {
      res.status(400).json({ message: 'No laundromat with that email!' });
      return;
    }

    const validPassword = dbLaundromatData.checkPassword(req.body.password);
    //const validPassword = dbLaundromatData.password === req.body.password?true:false;
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.laundromat_id = dbLaundromatData.id;
      req.session.laundromat_email = dbLaundromatData.email;
      req.session.adminLoggedIn = true;
  
      res.json({ laundormat: dbLaundromatData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.adminLoggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', password: 'password1234'}

  // pass in req.body instead to only update what's passed through
  Laundromats.update({
      email: req.body.email,
      password: req.body.password,
      name:req.body.name
    },
    {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbLaundromatData => {
      if (!dbLaundromatData) {
        res.status(404).json({ message: 'No laundromat found with this id' });
        return;
      }
      res.json(dbLaundromatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Laundromats.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No laundormat found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

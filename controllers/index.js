const router = require('express').Router();

// const customerRoutes = require('./customer-routes.js');
const laundromatRoutes = require('./laundromat-routes.js');

// router.use('/', customerRoutes);
router.use('/laundromat', laundromatRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;



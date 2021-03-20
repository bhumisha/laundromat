const router = require('express').Router();

const customerRoutes = require('./customer-routes.js');
const laundromatRoutes = require('./laundromat-routes.js');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/laundromat', laundromatRoutes);
router.use('/customer', customerRoutes);


router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;



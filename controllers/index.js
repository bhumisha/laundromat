const router = require('express').Router();

const customerRoutes = require('./customer-routes.js');
const adminRoutes = require('./admin-routes.js');

router.use('/', customerRoutes);
router.use('/admin', adminRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;



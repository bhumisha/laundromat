const router = require('express').Router();

const apiRoutes = require('./api/');
const customerDashboardRoutes = require('./customer-dashboard.js');
const adminDashboardRoutes = require('./admin-dashboard.js');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/cust', customerDashboardRoutes);
router.use('/admin', adminDashboardRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;



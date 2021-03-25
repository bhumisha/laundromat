const router = require("express").Router();

const adminRoutes = require('./admin-routes.js');
const orderRoutes = require('./order-routes');
const customerRoutes = require('./customer-routes');

//Tell the api to use this routes
router.use('/admin', adminRoutes); // Admin / Laundromats related apis
router.use('/orders', orderRoutes); // Orders apis
router.use('/cust', customerRoutes); //Customer apis.

module.exports = router;

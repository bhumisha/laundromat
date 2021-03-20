const router = require("express").Router();

const adminRoutes = require('./admin-routes.js');
const orderRoutes = require('./order-routes');
// const customerRoutes = require('./customer-routes');

//Tell the api to use this routes
router.use('/admin', adminRoutes);
router.use('/order', orderRoutes);
// router.use('/customer', customerRoutes);

module.exports = router;

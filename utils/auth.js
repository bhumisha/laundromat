//This will check if user has already logged in if not than ask for login.
const withAuth = (req, res, next) => {
  if (!req.session.customer_id) {
    res.redirect('/');
  } else {
    next();
  }
};




//This will check if user has already logged in if not than ask for login.
const withAdminAuth = (req, res, next) => {
  if (!req.session.laundromat_id) {
    res.redirect('/orders');
  } else {
    next();
  }
};
module.exports = { withAuth,withAdminAuth};

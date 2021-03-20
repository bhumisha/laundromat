// import all models
const Customers = require('./Customers');
const Addresses = require('./Addresses');
const Laundromats = require('./Laundromats');
const Orders = require('./Orders');

// create associations

// //Customers has one Addresses.
Customers.hasOne(Addresses, {
  foreignKey: 'customer_id',
});


Addresses.belongsTo(Customers,{
  foreignKey: 'customer_id',
   onDelete: 'SET NULL'
});

Laundromats.hasOne(Addresses, {
  foreignKey: 'laundromat_id'
});

Addresses.belongsTo(Laundromats,{
  foreignKey: 'laundromat_id',
  onDelete: 'SET NULL'
});


Customers.hasMany(Orders,{
  foreignKey: 'customer_id'
});



Orders.belongsTo(Customers, {
  foreignKey: 'customer_id',
  onDelete: 'SET NULL'
});

// Comment is related to Post. it belongs to Post. User can give comments on Post.
// Comment.belongsTo(Customer, {
//   foreignKey: 'customer_id',
//   onDelete: 'SET NULL'
// });


module.exports = { Customers, Laundromats ,Addresses, Orders};
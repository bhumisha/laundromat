// import all models
const Customers = require('./Customers');
const Locations = require('./Locations');
const Laundromats = require('./Laundromats');
const Orders = require('./Orders');

// create associations

Laundromats.hasMany(Locations, {
  foreignKey: 'laundromat_id'
});


Locations.belongsTo(Laundromats,{
  foreignKey: 'laundromat_id',
  onDelete: 'SET NULL'
});

Customers.hasMany(Orders,{
  foreignKey: 'customer_id'
});

Laundromats.hasMany(Orders,{
  foreignKey: 'laundromat_id'
});

Orders.belongsTo(Customers, {
  foreignKey: 'customer_id',
  onDelete: 'SET NULL'
});

Orders.belongsTo(Laundromats, {
  foreignKey: 'laundromat_id',
  onDelete: 'SET NULL'
});
// Comment is related to Post. it belongs to Post. User can give comments on Post.
// Comment.belongsTo(Customer, {
//   foreignKey: 'customer_id',
//   onDelete: 'SET NULL'
// });


module.exports = { Customers, Laundromats ,Locations, Orders};
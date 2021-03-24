const router = require('express').Router();
const {
  Laundromats,
  Locations
} = require('../models');
const {
  sortCity,
  sortState
} = require('../utils/apiHelper');

router.get('/', function (req, res) {
  Laundromats.findAll({
      attributes: [
        'name',
        'id'
      ],
      include: {
        model: Locations,
        attributes: ['city', 'state']
      }
    })
    .then(dbLocationData => {
      // res.json(dbOrdersData);   TWO 'RES' CALLS CAUSES AN ERROR. 
      const locations = dbLocationData.map(order => order.get({
        plain: true
      }));
      let cities = sortCity(locations)
      let states = sortState(locations)

      res.render('home', {
        cities,
        states
      });
    });
});

module.exports = router;
const router = require('express').Router();
const {
  Laundromats,
  Locations
} = require('../models');

let cities = [];
let states = [];

const sortCity = (location) =>{
  for(i=0;i<location.length;i++){
    let city = (location[i].locations[0].city);
    if(!cities.includes(city)){
      cities.push(city);
    }
  }
  console.log(cities);
  // console.log(cities.sort());
}
const sortState = (location) =>{
  for(i=0;i<location.length;i++){
    let state = (location[i].locations[0].state);
    if(!states.includes(state)){
      states.push(state);
    }
  }
  console.log(states);
}

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
      sortCity(locations)
      sortState(locations)

      res.render('home', {
        cities,
        states
      });
    });
});

module.exports = router;
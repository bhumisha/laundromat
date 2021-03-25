
let cities = [];
let states = [];

const sortCity = (location) =>{
  for(i=0;i<location.length;i++){
    let city = (location[i].locations[0].city);
    if(!cities.includes(city)){
      cities.push(city);
    }
  }
  cities = cities.sort();
  return cities;
}
const sortState = (location) =>{
  for(i=0;i<location.length;i++){
    let state = (location[i].locations[0].state);
    if(!states.includes(state)){
      states.push(state);
    }
  }
  states = states.sort();
  return states;
}

module.exports = {sortCity, sortState}
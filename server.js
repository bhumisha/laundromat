
const path = require('path');
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3000;
const express = require('express');
const exphbs  = require('express-handlebars');
const helpers = require('./utils/helpers');
const routes = require("./controllers");
// const models = require("./models");
// const { TableHints } = require('sequelize/types');
// const { table } = require('console');

const hbs = exphbs.create({ helpers });

const app = express();

// set up Handlebars.js as your app's template engine of choice
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

app.use(express.static('views/images'));

/**
 *  Connect to DB server and Database.
 * The Sequelize sync taking the models and connecting / map them to database Table and if they dont find table, it will create it for you.
 * {force: false} in the .sync() method. This doesn't have to be included, but if it were set to true, 
 * it would drop and re-create all of the database tables on startup (DROP TABLE IF EXISTS)
 * This is great for when we make changes to the Sequelize models,
 * as the database would need a way to understand that something has changed.
 * We'll have to do that a few times throughout this project,
 * so it's best to keep the {force: false}.   
**/
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening to port " + PORT));
});
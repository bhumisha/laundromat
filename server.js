const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  rolling: true, // <-- Set `rolling` to `true`
  // cookie: {
  //     maxAge: //10000 //10 sec.
  // }
};

// app.use(session(sess));
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: 'Super secret secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Helpers contains util files which have generic format functions.
const helpers = require('./utils/helpers');

//To set handle bar engine.
const hbs = exphbs.create({ helpers });

//To registering handlebar and set engine value.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Express is used to make api calls.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Controllers is interface between model and view. It has api which connect to Db and get the model output and provide to view apis/ pages.
app.use(require('./controllers/'));

//Sequelize sync is always in sync with db changes.
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
  app.listen(PORT, () => console.log('Now listening to port ' + PORT));
});

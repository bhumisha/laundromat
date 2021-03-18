
const path = require('path');
const PORT = process.env.PORT || 3001;
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/'));
app.use(express.static('views/images'));
app.listen(3000);
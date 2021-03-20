// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

/** 
 * We dont need to same dotenv to variable just execute it so .env files data will be available here.
 * you can use environment variable value as process.env.<VARIABLE-NAME>.
**/
require('dotenv').config();

/** create connection to our database, pass in your MySQL information for username and password **/
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}
module.exports = sequelize;

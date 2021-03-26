# SimpleSuds 
SimpleSuds connects customers to local laundromats that will pick up and return laundry clean, ironed, and folded.

### Technology 
- MVC (Model View Controller) pattern 
- BootStrap framework with: 
    - Handlebars for the HTML Templates
    - vanilla CSS
    - JavaScript
    - Sequelize
    - MySQL
    - Node.JS
    - bcrypt
    - Express
- Lucid for basic DB design / wireframes / project tasks
- Passport JS for Login authentication
- Cypress for front end test automation

### Installation

To install dependencies, run the following command: 

```npm install```

This will install mysql2, dotenv, Handlebars.js,express-session,express, bcrypt and Sequelize libraries, passport and cypress.

### Project Deployment / GitHub Details

To clone the project:
- SSH - git@github.com:bhumisha/laundromat.git
- HTTPS - https://github.com/bhumisha/laundromat.git
 
Project Source code : https://github.com/bhumisha/laundromat

This project is also deployed to Heroku, a cloud platform as a service where user can deploy project in many languages:
- Heroku URL https://simple-suds.herokuapp.com

### Automotated testing with Cypress
<img width="1552" alt="Screen Shot 2021-03-25 at 5 22 34 PM" src="https://user-images.githubusercontent.com/70823737/112559718-ce3e6480-8d8e-11eb-8bf9-651ea3775510.png">


Precondition: To run tests found in `customer_spec.js`, at least one laundromat has to exist in the database. If no laundromats exist in the laundromats table, you can quickly create it by running the tests found in laundromat_spec.js first.

1. Open cypress/integration/laundromat/util/exports.js and edit the email address and password for the laundromat assigned with id=1 in the database.

<img width="369" alt="Screen Shot 2021-03-25 at 4 45 58 PM" src="https://user-images.githubusercontent.com/70823737/112557383-9680ee00-8d89-11eb-8dad-705f50394181.png">

2. To run test specs individually in the Cypress Test Runner GUI:
```npx cypress open``` 

3. Click on the spec to run the test.

<img width="534" alt="Screen Shot 2021-03-25 at 5 00 54 PM" src="https://user-images.githubusercontent.com/70823737/112558315-b4e7e900-8d8b-11eb-919a-98d1bfa5e9bb.png">

4. To run all tests via command line:
```npx cypress open -b chrome --spec "cypress/integration/laundromat/*_spec.js"```
<img width="1031" alt="Screen Shot 2021-03-25 at 5 07 10 PM" src="https://user-images.githubusercontent.com/70823737/112558839-edd48d80-8d8c-11eb-8900-fcae219fdb56.png">

Please note that running tests via command line will create videos of the test runs that you can refer back to later, but they also take time to compress. This option can be turned off. Visit [cypress](https://cypress.io) for more information.










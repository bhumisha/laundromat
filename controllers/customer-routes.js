const router = require('express').Router();

const sequelize = require('../config/connection');
const { Customers, Laundromats, Addresses, Orders } = require('../models');


let session = {
  loggedIn: false
}

router.get('/', function (req, res) {

  res.render('home',{
    session
  });
});


router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'name',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    if(req.session.loggedIn){}
    else{
      req.session.loggedIn = false;
    }
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
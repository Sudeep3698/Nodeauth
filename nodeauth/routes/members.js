var express          = require('express');
var router           = express.Router();
var User             = require('../models/user');

exports = module.exports = router.get('/', function(req, res){
    User.find({"role" : "member"}, function(err, users){
      if(err){
        console.log(err);
      }
      var model = {
        users : users
      }
      res.render('member', model);
    });
});

exports = module.exports = router.get('/:id', function(req, res, next){
    User.find({}, function(err, users){
      if(err){
        console.log(err);
      }
      var model = {
          users : users
        }
        res.render('checkout', model);
      });
});

module.exports = router;

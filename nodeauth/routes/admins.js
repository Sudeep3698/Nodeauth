var express          = require('express');
var router           = express.Router();
var User             = require('../models/user');
var Admin            = require('../models/admin');

exports = module.exports = router.get('/', function(req, res, next){
  User.find({"role": "member"}, function(err, users){
    if(err){
      console.log(err);
    }
    var model = {
      users: users
    }
    res.render('admindashboard', model);
  });
});

exports = module.exports = router.get('/admin/login', function(req, res, next) {
   res.render('adminLogin', {
     'title':'Admin Login Only'
   });
});

exports = module.exports = router.post('/admin/login', function(req, res){
  var username = req.body.username;
  var adminCode = req.body.adminCode;

  var newAdmin = new Admin({
      username: username,
      adminCode: adminCode
  });
  Admin.createAdmin(newAdmin, function(err, admin){
      if(err) throw err;
      console.log(admin);
  });
  if(adminCode === 'secretCode123'){
      req.flash('success', 'You have been successfully logged in as Admin');
      res.render('admin');
  } else {
      req.flash('error', 'Invalid code');
      res.redirect('/admins/admin/login');
  }
});

//exports = module.exports = router.get('/edit/:id', function(req, res){
    //User.find({}, function(err, user){
    //  if(err){
    //    console.log(err);
  //    }
  //    var model = {
  //      user: user
  //    };
  //    res.render('edit', model);
  //  });


exports = module.exports = router.get('/:id', function(req, res, next){

    User.update({"role": "member"},
            {$set:{"status": "true"}}, {multi:true}, function(err, user){
      if(err) {
        console.log('update error', err);
      }
      req.flash('success', "User verified and now can able to pay");
      res.location('/');
      res.redirect('/')
    });
});

module.exports = router;

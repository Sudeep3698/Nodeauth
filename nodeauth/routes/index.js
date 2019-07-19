var express = require('express');
var router  = express.Router();
var User    = require('../models/user');
var Admin   = require('../models/admin');

router.get('/', function(req, res){
      res.render('index');
    });

router.get('/member', function(req, res, next) {
    if(req.isAuthenticated()){
      res.render('member');
    } else {
      res.sendStatus(403); //Forbidden
    }
});

router.get('/admin', function(req, res, next) {
    if(req.isAuthenticated()){
      res.render('admin');
    } else {
      res.sendStatus(403); //Forbidden
    }
});

module.exports = router;

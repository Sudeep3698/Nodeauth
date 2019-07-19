var express          = require('express');
var router           = express.Router();
var checksum         = require('../models/checksum');
var config           = require('../config/config');

module.exports = router.post('/', function(req,res){
   console.log("in response post");
   var paramlist = req.body;
        var paramarray = new Array();
        console.log(paramlist);
        if(checksum.verifychecksum(paramlist, config.PAYTM_MERCHANT_KEY))
        {
               console.log("true");
               res.render('response',{ 'restdata' : "true" ,'paramlist' : paramlist});
        }else
        {
           console.log("false");
          res.render('response',{ 'restdata' : "false" , 'paramlist' : paramlist});
        };
});

var express          = require('express');
var router           = express.Router();
var checksum         = require('../models/checksum');
var config           = require('../config/config');

exports = module.exports = router.get('/', function(req, res){
   console.log("in restaurant");
   console.log("--------testtxnjs----");
   res.render('testtxn',{
     'config' : config
   });
});

exports = module.exports = router.post('/', function(req, res, next) {
        console.log("POST Order start");
        var paramlist = req.body;
        var paramarray = new Array();
        console.log(paramlist);
        for (name in paramlist)
        {
          if (name == 'PAYTM_MERCHANT_KEY') {
               var PAYTM_MERCHANT_KEY = paramlist[name] ;
            }else
            {
            paramarray[name] = paramlist[name] ;
            }
        }
        console.log(paramarray);
        paramarray['CALLBACK_URL'] = 'http://localhost:3000/response';  // in case if you want to send callback
        console.log(PAYTM_MERCHANT_KEY);
        checksum.genchecksum(paramarray, PAYTM_MERCHANT_KEY, function (err, result)
        {
              console.log(result);
              res.redirect('/pgredirect');
              res.render('pgredirect',{
                'restdata' : result
              });
        });
        console.log("POST Order end");
});

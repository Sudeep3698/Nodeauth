var express          = require('express');
var router           = express.Router();
var checksum         = require('../models/checksum');

var targetBaseUrl = 'https://pguat.paytm.com/oltp-web/processTransaction';

function handleRedirect(req, res){
    var targetUrl = targetBaseUrl + req.originalUrl;
    res.redirect(targetUrl);
}

exports = module.exports = router.get('/', handleRedirect, function(req, res){
		console.log("in pgdirect");
		console.log("--------testtxnjs----");
		res.render('pgredirect');
});

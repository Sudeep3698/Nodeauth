var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

// Admin Schema
var AdminSchema = mongoose.Schema({
    username:{
        type: String,
        index: true
    },
    status: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: String
    }
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.createAdmin = function(newAdmin, callback){
    newAdmin.save(callback);
}

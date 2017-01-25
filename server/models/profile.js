var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({

}); //end userSchema

var User = mongoose.model('profile', userSchema);

module.exports= User;

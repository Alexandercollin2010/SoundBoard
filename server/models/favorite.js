var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;


var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

// Must encrypt, salt and hash the password
UserSchema.pre('save', function(next) {
  // if user is modified we don't want to muck with their password
  // should be ok bc we are not currently writing code to modify users...
  // this could change
  var user = this;

  if(!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {

        // change the password to the hash
        user.password = hash;
        next();
      });
  });
});

// compare passwords
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err ? callback(err) : callback(null, isMatch)); // null - no error, and matched true/false
  });
};

var User = mongoose.model('users', UserSchema);
module.exports = User;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/profile');

router.post('/', function(req,res){
    var info = req.body;
    console.log('Post hit:', req.body);
    var postFav = new User ({
      
    });
    postFav.save(function(err){
      if(err){
        console.log(err);
        res.sendStatus(500);
      } else {
        res.send('vid faved');
      }
    });
}); //end post

router.get('/', function(req,res){
  console.log('GET route hit');
  User.find({}, function(err, result){
    if(err){
      console.log('GET Broke');
      res.sendStatus(500);
    } else {
      console.log('GET Sent');
      res.send(result);
    }
  });
});//end GET

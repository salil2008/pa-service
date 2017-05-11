var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
var Detour = require('./model').detour;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/detour', function(req, res, next){
  console.log(req.body);
  var request = req.body

  if(request){
    async.waterfall([

      function(callback) {
        var newEntry = new Detour(request)
        newEntry.save(function(err){
          if(err) {
            console.log(err);
            callback(err, null)
          } else {
            callback(null, request)
          }
        })
      },

      function(l_data, callback) {
        callback(null, l_data)
      }

    ], function(err, result){
      if(err) {
        console.log(err);
      } else if(result) {
        console.log(result);
        res.json({'statusCode': 200, 'statusMessage': 'Successfully Captured!'})
      }
    })
  } else {
    console.log('no data');
  }

});

router.post('/detour/check', function(req, res, next){
  console.log(req.body)
  var block = false
  var destination = req.body.destination

  async.series([

    function(callback) {
      Detour.find({"destination": destination}, function(err, data){
        if(err) {
          console.log(err);
          callback(err, null)
        } else if(data) {
          if(data.length > 0) {
            if(data.length >= 5) {
              block = true
              callback(null, block)
            } else {
              callback(null, block)
            }
          } else {
            callback(null, block)
          }
        }
      })
    }

  ], function(err, result){
    if(err) {
      console.log(err);
    } else if(result) {
      if(result[result.length - 1]){
        res.json({'statusCode': 200, 'statusMessage': 'Success', 'block': result[result.length - 1]})
      } else {
        res.json({'statusCode': 200, 'statusMessage': 'Success', 'block': result[result.length - 1]})
      }

    }
  })

});

module.exports = router;

var request = require('request');
//var async = require('async');
var myJSON = require('JSON');
var msql = require('mssgl');

var id = "";
var key = "";

var testjson ="";

function getMyBody(url, callback) {
  request({
    url: url,
    async:false,
    json: true
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      return callback(error || {statusCode: response.statusCode});
    }
      callback(null, body);  
  });
}

getMyBody('https://external.api.yle.fi/v1/programs/items.json?app_id=' + id + '&app_key='+ key + '&category=5-135&limit=1&availability=ondemand', function(err, body) {
  if (err) {
    console.log(err);
  } else {
    console.log(body.data);
    testjson = body.data[0].title;
    console.log(testjson);
  }
});
console.log(testjson);


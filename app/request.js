var request = require('request');

var id = "";
var key = "";

request('https://external.api.yle.fi/v1/programs/items.json?app_id=' + id + '&app_key='+ key, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) 
  }
})

var request = require('request');
//var async = require('async');
var myJSON = require('JSON');
var sql = require('mysql');

var id =
var key =
var off = 0;
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

function kissa(){
getMyBody('https://external.api.yle.fi/v1/programs/items.json?app_id=' + id + '&app_key='+ key + '&category=5-131&availability=ondemand&mediaobject=video&type=TVProgram', function(err, body) {
    if (err) {
	console.log(err);
    } else {
        console.log(body.meta.count);
	listaa( body.meta.count);
    }
});
}

function listaa(limit){
    getMyBody('https://external.api.yle.fi/v1/programs/items.json?app_id=' + id + '&app_key='+ key + '&category=5-131&availability=ondemand&mediaobject=video&type=TVProgram&offset=650&limit=' + 100, function(err, body) {
	if (err) {
	    console.log(err);
	} else {

            var con = sql.createConnection({
		 host     : 'localhost',
		 user     : 'root',
		 password : '',
		 database : 'db'

	    });

	    con.connect((function(err) {
                if(!err){
		    console.log("homma kusee");}
		else{
		    console.log(err)}
	    }));

            for(var i = 0; i < 100; i++){
		var suomiNimi = body.data[i].title.fi;
		var id = body.data[i].id;
		var imageId =  body.data[i].image.id;
		var orgTitle = body.data[i].originalTitle.unknown;
		//onnection.query('INSERT INTO elokuvat VALUES ('+ id + ',' + orgTitle + ',' + suomiNimi +','+ imageId+');');
		con.query('INSERT INTO elokuvat VALUES (asdfasdfs,asdfdsa,asdafds,adsfdas);');
	    }
	    


	}
    });}


kissa();

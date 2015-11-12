var request = require('request');
var myJSON = require('JSON');
var lite = require('sqlite3').verbose();
var id ="";
var key ="";
var testjson ="";
var fs = require('fs');
var db = new lite.Database('database');

// ajetaaan tiettokannan luontilauseet
fs.exists('DB', function (exists) {
    console.info('Creating database. This may take a while...');
    fs.readFile('test.sql', 'utf8', function (err, data) {
	if (err) throw err;
	db.exec(data, function (err) {
            if (err) throw err;
            console.info('Done.');
	});
    });
});

//haetaan requestilla body
function getMyBody(url, callback) {
    request({
	url: url,
	async:false,
	json: true
    }, function (error, response, body) {
	if (error || response.statusCode !== 200) {
	    return callback(error || {statusCode: response.statusCode});
	}
	return callback(null, body);
    });
}

//Aletaan ajamaan kantaan tietoja
function ajaKantaan(){
    getMyBody('https://external.api.yle.fi/v1/programs/items.json?app_id=' + id + '&app_key='+ key + '&category=5-131&availability=ondemand&mediaobject=video&type=TVProgram', function(err, body) {
	if (err) {
	    console.log(err);
	} else {
            console.log(body.meta.count);
	    var count = body.meta.count;
	    var offset = 0;
	    while(count > offset)
	    {
		kirjoitaYLE(offset);
		offset = offset +100;
	    }
	}
    });
}

//aloittaa yleapista saatavan tiedon ylöskirjauksen ja kutssuu ombta ja trailerapia
function kirjoitaYLE(off){
    getMyBody('https://external.api.yle.fi/v1/programs/items.json?app_id=' + id + '&app_key='+ key + '&category=5-131&availability=ondemand&mediaobject=video&type=TVProgram&offset='+off+ '&limit=' + 100, function(err, body) {
	if (err) {
	    console.log("ylessä " + err);
	} else {
            for(var i = 0; i < 100; i++){
                var smn = "";
                var iid = "";
		var orgt = "";

                try{
		    iid =  body.data[i].image.id;
                    smn = body.data[i].title.fi;
		    orgt = body.data[i].originalTitle.unknown;
                }
                catch(err){
                }
		try{
                    var m =  body.data[i].id;
		}
                catch(err){continue;}
                var oid = body.data[i].id;		
		db.run('INSERT OR IGNORE INTO elokuvat (id,orginalnimi,suominimi,imgid) VALUES(?,?,?,?)',oid,orgt,smn,iid);
		haeOmdb(orgt,smn);
	    }
	}});}

//hakee ja kirja omdbsta saatavan tiedon
function haeOmdb(orgio,smn){
    if(orgio != 'undefined'){
	getMyBody('http://www.omdbapi.com/?t='+ orgio +'=&plot=short&r=json', function(err, body) {
	    if (err) {
		console.log("haetaan omdb" + err);
	    } else {
                try{
		    var a = (body.imdbID);
		    var b = (body.imdbRating);
		    
                }
                catch(err){
		    return;  
                }
		db.run('INSERT OR IGNORE INTO omdb (orginalnimi,rating,imdbid) VALUES(?,?,?)',orgio,body.imdbRating,body.imdbID);
		haeTraileri(body.imdbID);
	    }});}
    else if(smn != 'undefined'){
	getMyBody('http://www.omdbapi.com/?t='+ smn +'=&plot=short&r=json', function(err, body) {
	    if (err) {
		console.log("haetaa omdb" + err);
	    } else {
                try{
		    var a = (body.imdbID);
		    var b = (body.imdbRating);
		    
                }
                catch(err){
		    return;  
                }
		db.run('INSERT OR IGNORE INTO omdb (orginalnimi,rating,imdbid) VALUES(?,?,?)',smn,body.imdbRating,body.imdbID);
		haeTraileri(body.imdbID);
	    }});}
}

//haetaan linkki traileriin
function haeTraileri(imdbid){
    try{
	var a =imdbid.substring(2);
    }catch(err){
	return;
    }
    
    getMyBodyXml("http://api.traileraddict.com/?imdb="+imdbid.substring(2) +"&count=4&width=680", function(err, body) {
	if (err) {
	    console.log("trailerissa jopa " + err);
	} else {
            try{
		//TODO
            }
            catch(err){
		return;  
            }
	  //  db.run('INSERT OR IGNORE INTO omdb (orginalnimi,rating,imdbid) VALUES(?,?,?)',smn,body.imdbRating,body.imdbID);
	}});}


//Hakee xml-rungon
function getMyBodyXml(url, callback){
return;
}


ajaKantaan();
//db.close();

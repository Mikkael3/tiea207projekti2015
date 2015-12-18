/*
* Modified by:Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
var request = require('request');
var myJSON = require('JSON');
var lite = require('sqlite3').verbose();
var id ="";
var key ="";
var fs = require('fs');
var jsxml = require("node-jsxml");
var exists = fs.existsSync('database');
var db = new lite.Database('database');
var Namespace = jsxml.Namespace,
    QName = jsxml.QName,
    XML = jsxml.XML,
    XMLList = jsxml.XMLList;

// ajetaaan tiettokannan luontilauseet
db.serialize(function(){
    console.log("Luodaan kanta");
    if(!exists){
	fs.readFile('test.sql', 'utf8', function (err, data) {
	    if (err) throw err;
	    db.exec(data, function (err) {
		if (err) throw err;
		console.info('Done.');
	    });
	});
    }
    else{
	db.run('DROP TABLE elokuvat;');
	db.run('DROP TABLE trailers;');
	db.run('DROP TABLE omdb;');
	db.run('DROP TABLE genres;');
	fs.readFile('test.sql', 'utf8', function (err, data) {
	    if (err) throw err;
	    db.exec(data, function (err) {
		if (err) throw err;
		console.info('Done.');
	    });
	});
    }
});

//haetaan requestilla body
function getMyBody(url, callback) {
    request({
	url: url,
	async: false,
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
	    kirjoitaYLE(off);
	} else {

            for(var i = 0; i < 100; i++){
                var smn = "";
                var iid = "";
        	var orgt = "";
                var endt = '-';
                var stat = '-';
		var kuvaus = '-';
		var pmtl = '-';
		try{
		    body.data[i].publicationEvent.length;
		}
                catch(err){continue;}
                for(var n = 0; n < body.data[i].publicationEvent.length; n++){
                    try{
			if( body.data[i].publicationEvent[n].temporalStatus == "currently"){
                            endt = body.data[i].publicationEvent[n].endTime;
                            stat = body.data[i].publicationEvent[n].startTime;
                            break;
			}
		    }catch(err){continue;}
		}


                try{

		    iid =  body.data[i].image.id;
                    smn = body.data[i].title.fi;
		    orgt = body.data[i].originalTitle.unknown;
		    kuvaus = body.data[i].description.fi;
		    pmtl = body.data[i].promotionTitle.fi;

                }
                catch(err){
                }
		try{
                    var m =  body.data[i].id;
		}
                catch(err){continue;}

                var oid = body.data[i].id;

		try{
		    for(n=0; n < body.data[i].partOfSeries.subject.length; n++){
			if(body.data[i].partOfSeries.subject[n].key != undefined)
			    db.run('INSERT OR IGNORE INTO genres (id,genre) VALUES(?,?)',oid,body.data[i].partOfSeries.subject[n].key);
		    }

		}
		catch(err){

		}

		if(smn == ""  || smn == null)
		    smn = '-';
		if(orgt == "" || orgt == null)
		    orgt = '-';
		db.run('INSERT OR IGNORE INTO elokuvat (id,originalnimi,suominimi,imgid,kuvaus,endtime,starttime,promotiontitle) VALUES(?,?,?,?,?,?,?,?)',oid,orgt,smn,iid,kuvaus,endt,stat,pmtl);
		haeOmdb(orgt,smn);
	    }
	}});}

//hakee ja kirja omdbsta saatavan tiedon
function haeOmdb(originalnimi,smn){
    if(originalnimi != '-'){
	getMyBody('http://www.omdbapi.com/?t='+ originalnimi +'&plot=short&r=json', function(err, body) {
	    if (err) {
		console.log("haetaan omdb" + err);
		haeOmdb(originalnimi,smn);
	    } else {
                try{
		    var a = (body.imdbID);
		    var b = (body.imdbRating);

                }
                catch(err){
		    return;
                }
		db.run('INSERT OR IGNORE INTO omdb (originalnimi,rating,imdbid) VALUES(?,?,?)',originalnimi,body.imdbRating,body.imdbID);
		haeTraileri(body.imdbID);
	    }});}
    else if(smn != '-'){
	getMyBody('http://www.omdbapi.com/?t='+ smn +'&plot=short&r=json', function(err, body) {
	    if (err) {
		console.log("haetaa omdb" + err);
		haeOmdb(originalnimi,smn);
	    } else {
                try{
		    var a = (body.imdbID);
		    var b = (body.imdbRating);

                }
                catch(err){
		    return;
                }
		db.run('INSERT OR IGNORE INTO omdb (originalnimi,rating,imdbid) VALUES(?,?,?)',smn,body.imdbRating,body.imdbID);
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
    getMyBodyXml("http://api.traileraddict.com/?imdb="+imdbid.substring(2), function(err, body) {
	if (err) {
	    console.log("trailerissa" + err);
	} else {
	    var link = '';
            try{
		var xml = new XML(body);
		link = xml.child('trailer').child('link').toString();
	    }
            catch(err){
		return;
            }
	    if(link.length > 0)
		db.run('INSERT OR IGNORE INTO trailers (imdbid,link) VALUES(?,?)',imdbid,link);
	}});}


//Hakee xml-rungon
function getMyBodyXml(url, callback){
    request({
	url: url,
	async:false
    }, function (error, response, body) {
	if (error || response.statusCode !== 200) {
	    return callback(error || {statusCode: response.statusCode});
	}
	return callback(null, body);
    });
}

ajaKantaan();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var async = require('async');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;
var routes = require('./app/routes');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/database');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/api/titles/all', function(req, res, next) {
		var lista = [];
		var finish = function() {
			res.send(lista);
		}

			db.all('Select * from elokuvat LEFT JOIN omdb ON elokuvat.originalnimi=omdb.originalnimi', function(err,row) {
					/*var title = {
						"name": row.orginalnimi,
						"titleId" : row.id,
						"bio": row.suominimi
					};

					lista.push(title);
*/

				res.send(row);
			});





});

app.get('/api/titles/:id', function(req, res, next) {
		var id = req.params.id;

		//var id = req.params.id;
		var testititle = {
		"originalnimi": "",
		"imgid": "",
		"id": "",
		"suominimi": ""
		};



		db.get('SELECT * FROM elokuvat LEFT JOIN omdb ON elokuvat.originalnimi=omdb.originalnimi where id = ?', id, function(err, row) {


			res.json({ "originalnimi": row.originalnimi,
									"id": row.id,
									"suominimi": row.suominimi,
									"imgid" : row.imgid,
									"kuvaus" : row.kuvaus,
									"endtime" : row.endtime,
									"starttime" : row.starttime,
									"promotiontitle" : row.promotiontitle,
									"rating" : row.rating
			});
		});






});

app.use(function(req, res) {
	Router.match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {
		if (err) {
			res.status(500).send(err.message)
		} else if (redirectLocation) {
			res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			var html = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
			var page = swig.renderFile('views/index.html', { html: html });
			res.status(200).send(page);
		} else {
			res.status(404).send('Page Not Found')
		}
	});
});
/*
app.get('/api/getTitles') {
	//tarkistaa onko haettu viim 24h
	//jos on jatketaan
	//jos ei ni haetaan uudestaan
	//hakee dbsta
	//muuttaa json
	//palauttaa tiedoston
}

haeylejaombd() {
	//haetiedot
	//$.ajax(yleltä)
	//syötetään db
	//sama omdb
}

*/

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

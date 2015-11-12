var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;
var routes = require('./app/routes');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../database/database');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/api/titles/:id', function(req, res, next) {
    var id = req.params.id;

    //var id = req.params.id;
    var testititle = {
    "name": "",
    "picture": "",
    "titleId": "",
    "bio": "",
    "balance": "$2,934.07"};



    db.get('Select * from elokuvat where id = ?', id, function(err, row) {
      console.log("mitä asdfasdf "+ row.id);

      res.json({ "name": row.orginalnimi,
                  "titleId": row.id,
                  "bio": row.suominimi
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

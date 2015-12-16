var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var async = require('async');

var swig = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var RoutingContext = Router.RoutingContext;
var routes = require('./app/routes');
var pg = require("pg");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/database');
var arvdb;

console.log(process.env.DATABASE_URL);
if (process.env.DATABASE_URL !== undefined)
    arvdb = process.env.DATABASE_URL;
else {
    arvdb = new sqlite3.Database('./database/arvosteludb');
}

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));






app.post('/api/arvostelu', function(req, res, next) {
    var id = req.body.id;
    var arvosana = req.body.arvosana;

    if (process.env.DATABASE_URL !== undefined) {
        pg.connect(arvdb, function(err, client) {
            if (err) throw err;
            console.log('Connected to postgres! Getting schemas...');
            client.query('INSERT INTO arvostelu (yleid,arvosana) VALUES ($1,$2)', [id, arvosana],function(err,result) {
                //done();
                res.send({
                    message: "Arvostelu onnistui!"
                });
            });
        });

    } else {
        var stmt = arvdb.prepare("INSERT INTO arvostelu (yleid, arvosana) VALUES(?,?)");
        stmt.run(id, arvosana);
        stmt.finalize();
        res.send({
            message: "Arvostelu onnistui!"
        });
    }
});
app.get('/api/arvostelut/:id', function(req, res, next) {
    var id = req.params.id;
    if (process.env.DATABASE_URL === undefined) {
        arvdb.get("Select avg(arvosana) as ka from arvostelu where yleid = ?", id, function(err, row) {
            res.send(row);
        });
    }
    else {
        pg.connect(arvdb, function(err, client) {
            if (err) throw err;
            console.log('Connected to postgres! Getting schemas...');
            client.query('Select avg(arvosana) as ka from arvostelu where yleid = $1', [id] ,function(err, result) {
                //done();
                res.send(result.ka);
            });
        });
    }
});
app.get('/api/titles/all', function(req, res, next) {
    db.all('Select * from elokuvat LEFT JOIN omdb ON elokuvat.originalnimi=omdb.originalnimi', function(err, row) {
        res.send(row);
    });

});

app.get('/api/titles/:id', function(req, res, next) {
    var id = req.params.id;

    db.get('SELECT * FROM elokuvat LEFT JOIN omdb ON elokuvat.originalnimi=omdb.originalnimi where id = ?', id, function(err, row) {


        res.json({
            "originalnimi": row.originalnimi,
            "id": row.id,
            "suominimi": row.suominimi,
            "imgid": row.imgid,
            "kuvaus": row.kuvaus,
            "endtime": row.endtime,
            "starttime": row.starttime,
            "promotiontitle": row.promotiontitle,
            "rating": row.rating
        });
    });

});

app.get('/api/series/search', function(req, res, next) {
    var id = req.query.name;
    console.log(id);
    db.all('Select * from elokuvat LEFT JOIN omdb ON elokuvat.originalnimi=omdb.originalnimi where elokuvat.originalnimi = ?', id, function(err, row) {
        res.send(row);
    });

});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { res.send(results); }
    });
  });
})

app.use(function(req, res) {
            Router.match({
                    routes: routes,
                    location: req.url
                }, function(err, redirectLocation, renderProps) {
                    if (err) {
                        res.status(500).send(err.message)
                    } else if (redirectLocation) {
                        res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
                    } else if (renderProps) {
                        var html = ReactDOM.renderToString( < RoutingContext {...renderProps
                            }
                            />);
                            var page = swig.renderFile('views/index.html', {
                                html: html
                            }); res.status(200).send(page);
                        } else {
                            res.status(404).send('Page Not Found')
                        }
                    });
            });

        app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + app.get('port'));
        });

var http = require('http');
var React = require('react');
var express = require('express');
var app = express();
var browserify = require('browserify');  
var ReactDOMServer = require('react-dom/server'),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script;

var Kehys = require('./views/index.jsx');
app.get('/',function(req,res){
 
res.setHeader('Content-Type', 'text/html');
    res.end(ReactDOMServer.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.div({ id: 'app',dangerouslySetInnerHTML: {__html: ReactDOMServer.renderToString(React.createElement(Kehys))}}),
      React.DOM.script({'id': 'initial-data','type': 'text/plain'}),
      React.DOM.script({src: '/bundle.js'}))
  ));

});

var OhjelmaKehys = require('./views/ohjelma.jsx');

app.get('/ohjelma',function(req,res){
 
res.setHeader('Content-Type', 'text/html');
  res.end(ReactDOMServer.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.div({ id: 'app',dangerouslySetInnerHTML: {__html: ReactDOMServer.renderToString(React.createElement(OhjelmaKehys))}}),
      React.DOM.script({'id': 'initial-data','type': 'text/plain'}),
      React.DOM.script({src: '/bundle.js'}))
  ));

});


var server = app.listen(3333, function() {  
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});

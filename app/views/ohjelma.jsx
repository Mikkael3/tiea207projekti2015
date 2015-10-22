var React = require('react'),  DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li,label=DOM.label,form= DOM.form
var ReactDomServer = require('react-dom/server');

var HakupalkkiClass = React.createClass({
    render:function(){
	return div(null,form(null,label(null,'Hakusana'), DOM.input({type:'text'}) ,DOM.select(null,DOM.option(null,'Vuosi'))),DOM.input({type:'submit' ,value:'Hae!'}));
    }
});

var Hakupalkki = React.createFactory(HakupalkkiClass);

var OhjelmaKehysClass = React.createClass({
    render:function(){
	return div(null,MainOhjelma(null));
    }
});

var Ohjelma = React.createFactory(OhjelmaKehysClass);

var MainOhjelmaClass = React.createClass({
    render:function(){
	return div(null,div(null,DOM.img({src:"http://placehold.it/450x250"}),DOM.p(null,'Elokuvana nimi'),DOM.p(null,'Jotain muuta')));
    }
});

var MainOhjelma = React.createFactory(MainOhjelmaClass);

module.exports = React.createClass({
    render: function() {

        return div(null,Hakupalkki(null),Ohjelma(null));
    }
});


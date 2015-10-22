var React = require('react'),  DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li,label=DOM.label,form= DOM.form
var ReactDomServer = require('react-dom/server');

var liStyle = { width:'50%',
                listStyle:'none',
		float:'left'
              };

var hapaStyle = { float:'left',
                  width:'100%'
                };

var HakupalkkiClass = React.createClass({
    render:function(){
	return form({style:hapaStyle},label(null,'Hakusana'), DOM.input({type:'text'}) ,DOM.select(null,DOM.option(null,'Vuosi')),DOM.input({type:'submit' ,value:'Hae!'}));
    }
});

var Hakupalkki = React.createFactory(HakupalkkiClass);

var ListausClass = React.createClass({
    render:function(){
	return div(null,ListausElementti(null),ListausElementti(null),ListausElementti(null),ListausElementti(null));
    }
});

var Listaus = React.createFactory(ListausClass);

var ListausElementtiClass = React.createClass({
    render:function(){
	return li({style:liStyle},div(null,DOM.a({href:"./ohjelma"},DOM.img({src:"http://placehold.it/250x150"})),DOM.p(null,'Elokuvana nimi'),DOM.p(null,'Jotain muuta')));
    }
});

var ListausElementti = React.createFactory(ListausElementtiClass);

module.exports = React.createClass({
    render: function() {
        return div(null,Hakupalkki(null),Listaus(null));
    }
});




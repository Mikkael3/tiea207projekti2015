var React = require('react'),  DOM = React.DOM, div = DOM.div, button = DOM.button, ul = DOM.ul, li = DOM.li,label=DOM.label,form= DOM.form
var ReactDomServer = require('react-dom/server');

var HakupalkkiClass = React.createClass({
    render:function(){
	return div(null,form(null,label(null,'Hakusana'), DOM.input({type:'text'}) ,DOM.select(null,DOM.option(null,'Vuosi'))),DOM.input({type:'submit' ,value:'Hae!'}));
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
	return li(null,div(null,DOM.img({src:"http://placehold.it/250x150"}),DOM.p(null,'Elokuvana nimi'),DOM.p(null,'Jotain muuta')));
    }
});

var ListausElementti = React.createFactory(ListausElementtiClass);

module.exports = React.createClass({
    render: function() {

        return div(null,Hakupalkki(null),Listaus(null));
    }
});


// var Kehys = React.createClass({
//     render:function(){
// 	return(<div><Hakupalkki/><Listaus/></div>);
//     }
// });

// var Hakupalkki = React.createClass({
//     render:function(){
// 	return(<form>
// 	       <label>Hakusana</label>
// 	       <input type="text"/>
// 	       <label>Hakuehto</label>
// 	       <select><option>Vuosi</option></select>
// 	       <label>Näytettävät kohteet</label>
// 	       <select><option>5</option></select>
// 	       <input type="submit" value="Hae"/>
// 	       </form>);
//     }
// });


// var Listaus = React.createClass({
//     render:function(){
// 	return(    <ul>
//         <ListaElementti/>
//         <ListaElementti/>
//         <ListaElementti/>
//         <ListaElementti/>
//         <ListaElementti/>
//        </ul>);
//     }
// });

// var ListaElementti = React.createClass({
//     render:function(){
// 	return(
// 	   <li><div>
//            <img src="http://placehold.it/250x150"/>
//            <p>elokuvan nimi</p>
// 	   <p>jotain muuta</p>
// 	   </div>
// 	   </li>)
//     }
// });


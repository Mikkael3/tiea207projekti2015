var React = require('react');
import React from 'react';

var Kehys = React.createClass({
    render:function(){
	return(<div><Hakupalkki/><Listaus/></div>)
    }
});

var Hakupalkki = React.createClass({
    render:function(){
	return(<form>
	       <label>Hakusana</label>
	       <input type="text"/>
	       <label>Hakuehto</label>
	       <select><option>Vuosi</option></select>
	       <label>Näytettävät kohteet</label>
	       <select><option>5</option></select>
	       <input type="submit" value="Hae"/>
	       </form>);
    }
});


var Listaus = React.createClass({
    render:function(){
	return(    <ul>
        <ListaElementti/>
        <ListaElementti/>
        <ListaElementti/>
        <ListaElementti/>
        <ListaElementti/>
       </ul>);
    }
});

var ListaElementti = React.createClass({
    render:function(){
	return(
	   <li><div>
           <img src="http://placehold.it/250x150"/>
           <p>elokuvan nimi</p>
	   <p>jotain muuta</p>
	   </div>
	   </li>)
    }
});
/*
* Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
import React from 'react';
import {Link} from 'react-router';

class Haku extends React.Component {
    render() {
	return(
    <form>
	       <label>Hakusana</label>
	       <input type="text"/>
	       <label>Hakuehto</label>
	       <select><option>Vuosi</option></select>
	       <label>Näytettävät kohteet</label>
	       <select><option>5</option></select>
	       <input type="submit" value="Hae"/>
	       </form>);
    }
}
export default Haku;

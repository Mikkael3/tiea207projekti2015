import React from 'react';
import {Link} from 'react-router';
import ArvosteluStore from '../stores/ArvosteluStore';
import ArvosteluActions from '../actions/ArvosteluActions';


class Arvostelu extends React.Component {


//handleArvostelu() {
//    ArvosteluActions.handleArvostelu();
//  }
    
	render() {
		return (
            <form id="Arvosteluform">
            
			<input type="number" id="arvosana" min="0" max="10" ></input>
            <input type="text" id="arvosteluteksti"></input>
            <input type="submit" id="arvostelunappula" value="Arvostele"></input>
            //<button onClick={this.handleArvostelu}>Arvostelupainike</button>
            </form>
			);
	}


}

export default Arvostelu;
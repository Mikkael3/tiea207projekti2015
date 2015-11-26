import alt from '../alt';
var sqlite3 = require('sqlite3').verbose();




class ArvosteluActions {
	constructor() {
		this.generateActions(
            'handleArvostelu'
		);
	}
    
    handleArvostelu() {
		this.actions.handleArvostelu();
	}

}

export default alt.createActions(ArvosteluActions);

import alt from '../alt';
import ArvosteluActions from '../actions/ArvosteluActions';


class ArvosteluStore {
	constructor() {
		this.bindActions(ArvosteluActions);
		//this.titles = [];

	}

//onHandleSort() {
//	this.titles = sortBy(this.titles, 'endtime');
//}

	
	handleArvostelu() {
     alert("moi");
     console.log("moi");
    //var db = new sqlite3.Database('../../../database/arvosteludb');
    //db.run('INSERT OR IGNORE INTO arvostelu (yleid,arvolause,arvosteluteksti) VALUES(?,?,?)',yleid,arvolause,arvosteluteksti);
    //db.end();
 
    }   

}

export default alt.createStore(ArvosteluStore);

import alt from '../alt';
import TrailerActions from '../actions/TrailerActions';


class TrailerStore {
	constructor() {
		this.bindActions(TrailerActions);
		

	}


}

export default alt.createStore(TrailerStore);

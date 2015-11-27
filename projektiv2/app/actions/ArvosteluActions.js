import alt from '../alt';



class ArvosteluActions {
	constructor() {
		this.generateActions(
            'handleArvostelu'
		);
	}

    handleArvostelu(id) {
		this.actions.handleArvostelu(id);
	}

}

export default alt.createActions(ArvosteluActions);

import alt from '../alt';



class ArvosteluActions {
	constructor() {
		this.generateActions(
            'handleArvostelu'
		);
	}

    handleArvostelu(tiedot) {
			$.ajax({
				type: 'POST',
				url: 'api/arvostelu',
				data: {id : tiedot.yleid, arvosana: tiedot.value}
			})
				.done((data) => {
						this.actions.handleArvostelu("ok");
				})
				.fail((jqXhr) => {
					this.actions.handleArvostelu(jqXhr);
				});



	}

}

export default alt.createActions(ArvosteluActions);

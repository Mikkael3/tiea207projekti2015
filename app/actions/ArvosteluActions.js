/*
* Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
import alt from '../alt';



class ArvosteluActions {
	constructor() {
		this.generateActions(
            'handleArvosteluSuccess',
						'handleArvosteluFail',
						'getArvosanaSuccess',
						'getArvosanaFail'
		);
	}

	getArvosana(id) {
		//alert(id);
		$.ajax({ url: '/api/arvostelut/' + id})
		 .done((data) => {
			this.actions.getArvosanaSuccess(data)
		 })
		 .fail((jqXhr) => {
			this.actions.getArvosanaFail(jqXhr)
		 });
	}


    handleArvostelu(tiedot) {
			$.ajax({
				type: 'POST',
				url: '/api/arvostelu',
				data: {id : tiedot.yleid, arvosana: tiedot.value}
			})
				.done((data) => {
						this.actions.handleArvosteluSuccess(data.message);

				})
				.fail((jqXhr) => {
					this.actions.handleArvosteluFail(jqXhr);
				});



	}

}

export default alt.createActions(ArvosteluActions);

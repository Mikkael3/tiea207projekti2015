import alt from '../alt';

class HomeActions {
	constructor() {
		this.generateActions(
			'getTitlesSuccess',
			'getTitlesFail'
		);
	}

	getTitles() {
		//Tehty json generaattorilla
		$.ajax({ url: 'http://www.json-generator.com/api/json/get/bMWSkViUSW?indent=2'})
		 .done((data) => {
		 	this.actions.getTitlesSuccess(data)
		 })
		 .fail((jqXhr) => {
		 	this.actions.getTitlesFail(jqXhr)
		 });
	}
}

export default alt.createActions(HomeActions);

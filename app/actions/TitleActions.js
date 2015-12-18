/*
* Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
import alt from '../alt';

class TitleActions {
	constructor() {
		this.generateActions(
			'getTitleSuccess',
			'getTitleFail'
		);
	}

	getTitle(titleId) {


		$.ajax({ url: '/api/titles/' + titleId})
		 .done((data) => {
		 	this.actions.getTitleSuccess(data)
		 })
		 .fail((jqXhr) => {
		 	this.actions.getTitleFail(jqXhr)
		 });
	}
}

export default alt.createActions(TitleActions);

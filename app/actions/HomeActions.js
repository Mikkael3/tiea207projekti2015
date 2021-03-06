/*
* Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
import alt from '../alt';

class HomeActions {
	constructor() {
		this.generateActions(
			'getTitlesSuccess',
			'getTitlesFail',
			'handleSort',
			'removeNoRating',
			'handleSortByReview'
		);
	}

	handleSort() {
		this.actions.handleSort();
	}

	removeNoRating() {
		this.actions.removeNoRating();
	}

	handleSortByReview() {
		this.actions.handleSortByReview();
	}

	getTitles() {

		$.ajax({ url: '/api/titles/all'})
		 .done((data) => {
		 	this.actions.getTitlesSuccess(data)
		 })
		 .fail((jqXhr) => {
		 	this.actions.getTitlesFail(jqXhr)
		 });
	}
}

export default alt.createActions(HomeActions);

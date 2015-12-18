/*
* Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import {sortBy,filter} from 'underscore';

class HomeStore {
	constructor() {
		this.bindActions(HomeActions);
		this.titles = [];
		this.originalTitles = [];
		this.prevTitles = [];
		this.sorted = false;
		this.rated = false;
		this.sortedByRated = false;


	}

	onHandleSort() {
		if(!this.sorted) {
			this.prevTitles = this.titles;
			this.titles = sortBy(this.titles, 'suominimi');
			this.sorted = true;
		}
		else {
			this.titles = this.prevTitles;
			this.sorted = false;
		}
	}

	onHandleSortByReview() {

		if(!this.sortedByRated) {
			this.prevTitles = this.titles;
			this.titles = sortBy(this.titles, function(title) {
				return -1* title.rating;
			});
			this.sortedByRated = true;
		}
		else {
			this.titles = sortBy(this.titles, function(title) {
				return title.rating;
			});
			this.sortedByRated = false;
		}
}

	onRemoveNoRating() {
		if(!this.rated) {
			this.rated = true;
			this.titles = filter(this.titles,function(title) {
				return title.rating > 0;
			});
			this.prevTitles = this.titles;

		}
		else {
			this.rated = false;
			this.titles = this.originalTitles;
		}
	}

	onGetTitlesSuccess(data) {

		this.titles = sortBy(data, function(title) {
			return -1 * title.suominimi;
		});

		this.originalTitles = this.titles;
	}

	onGetTitlesFail(jqXhr) {
		toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
	}
}

export default alt.createStore(HomeStore);

import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import {sortBy} from 'underscore';

class HomeStore {
	constructor() {
		this.bindActions(HomeActions);
		this.titles = [];

	}

	onHandleSort() {
		this.titles = sortBy(this.titles, 'endtime');
	}

	onGetTitlesSuccess(data) {
		this.titles = data;
	}

	onGetTitlesFail(jqXhr) {
		toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
	}
}

export default alt.createStore(HomeStore);

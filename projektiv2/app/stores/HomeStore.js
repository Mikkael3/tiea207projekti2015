import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
	constructor() {
		this.bindActions(HomeActions);
		this.titles = [];

	}

	onGetTitlesSuccess(data) {
		this.titles = data;
	}

	onGetTitlesFail(jqXhr) {
		toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
	}
}

export default alt.createStore(HomeStore);
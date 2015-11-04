import {assign} from 'underscore';
import alt from '../alt';
import TitleActions from '../actions/TitleActions';

class TitleStore {
	constructor() {
		this.bindActions(TitleActions);
		this.titleId = '0';
    this.name = 'testi';
    this.bio = '';
    this.balance = '';

	}

	onGetTitleSuccess(data) {
		assign(this, data);
	}

	onGetTitleFail(jqXhr) {
		toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
	}
}

export default alt.createStore(TitleStore);

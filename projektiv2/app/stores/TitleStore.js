import {assign} from 'underscore';
import alt from '../alt';
import TitleActions from '../actions/TitleActions';

class TitleStore {
	constructor() {
		this.bindActions(TitleActions);
		this.id = '';
    	this.originalnimi = '';
    	this.suominimi = '';
        this.imgid = '';
	}

	onGetTitleSuccess(data) {
		assign(this,data);
		this.id = data.id;
		this.originalnimi = data.originalnimi;
		this.suominimi = data.suominimi;
		this.imgid = data.imgid;

		//this.bio = data.bio;
	}

	onGetTitleFail(jqXhr) {
		toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
	}
}

export default alt.createStore(TitleStore);

import {assign} from 'underscore';
import alt from '../alt';
import SarjaActions from '../actions/SarjaActions';

class SarjaStore {
    constructor() {
	this.bindActions(SarjaActions);
	this.id = '';
    	this.originalnimi = '';
    	this.suominimi = '';
        this.imgid = '';
	this.rating = 0;
    	this.jaksot = [];
    }

    onGetTitleSuccess(data) {
	//assign(this,data);
	this.id = data.id;
	this.originalnimi = data.originalnimi;
	this.suominimi = data.suominimi;
	this.imgid = data.imgid;
    	this.rating = data.rating;
        this.trailer = data.trailer;
		//this.bio = data.bio;
	}

	onGetNewSarjaSuccess(data) {
		this.jaksot = data;
	}

	onGetNewSarjaFail(jqXhr) {
		toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
	}


  	onGetTitleFail(jqXhr) {
    	toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}

}

export default alt.createStore(SarjaStore);

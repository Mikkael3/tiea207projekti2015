/*
* Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
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
	this.rating = 0;
	this.trailer = "";
    }

    onGetTitleSuccess(data) {
	assign(this,data);
	this.id = data.id;
	this.originalnimi = data.originalnimi;
	this.suominimi = data.suominimi;
	this.imgid = data.imgid;
	this.rating = data.rating;
	this.trailer = data.trailer;

	}

	onGetTitleFail(jqXhr) {
		toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
	}
}

export default alt.createStore(TitleStore);

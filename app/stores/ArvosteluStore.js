/*
* Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
import alt from '../alt';
import ArvosteluActions from '../actions/ArvosteluActions';


class ArvosteluStore {
	constructor() {
		this.bindActions(ArvosteluActions);
		this.helpBlock = "";
		this.onkoArvosteltu= false;
		this.kolosseumKA = 0;
		//this.titles = [];

	}

	onGetArvosanaSuccess(data) {
		if(data !== undefined)
			this.kolosseumKA = data.ka;
	}

	onGetArvosanaFail(jqXhr) {

		toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
	}


	onHandleArvosteluSuccess(message) {
		this.helpBlock = message;
		this.onkoArvosteltu = true;

	}

	onHandleArvosteluFail(jqXhr) {
    	toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
  	}



}

export default alt.createStore(ArvosteluStore);

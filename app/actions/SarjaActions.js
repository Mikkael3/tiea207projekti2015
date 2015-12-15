import alt from '../alt';
import {assign} from 'underscore';

class SarjaActions {
	constructor() {
		this.generateActions(
			'getTitleSuccess',
			'getTitleFail',
      		'getSarjaSuccess',
      		'getSarjaFail',
			'getNewSarjaSuccess',
			'getNewSarjaFail'
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

	getNewSarja(titleName) {
		$.ajax({
			url: '/api/series/search',
			data: {name : titleName }
		})
		.done((data) => {
			this.actions.getNewSarjaSuccess(data);
		})
		.fail(() => {
			this.actions.getNewSarjaFail(titleName);
		});
	}

/*
  getSarja(titleName) {

    $.ajax({
		url: '/api/series/search',
		data: {name: titleName}
	})
     .done((data) => {
      this.actions.getSarjaSuccess(data)
     })
     .fail((jqXhr) => {
      this.actions.getSarjaFail(jqXhr)
     });
 } */
}

export default alt.createActions(SarjaActions);

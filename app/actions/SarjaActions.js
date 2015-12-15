import alt from '../alt';

class SarjaActions {
	constructor() {
		this.generateActions(
			'getTitleSuccess',
			'getTitleFail',
      'getSarjaSuccess',
      'getSarjaFail'
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


  getSarja(titleName) {


    $.ajax({ url: '/api/series/' + titleName})
     .done((data) => {
      this.actions.getSarjaSuccess(data)
     })
     .fail((jqXhr) => {
      this.actions.getSarjaFail(jqXhr)
     });
  }
}

export default alt.createActions(SarjaActions);

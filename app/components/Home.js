import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';



class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = HomeStore.getState();
		this.onChange = this.onChange.bind(this);

	}

	componentDidMount() {
		HomeStore.listen(this.onChange);
		HomeActions.getTitles();
	}

	componentWillUnmount() {
		HomeStore.unlisten(this.onChange);

	}

	handleSort() {
		HomeActions.handleSort();
	}

	handleSortByReview() {
		HomeActions.handleSortByReview();
	}

	removeNoRating() {

		HomeActions.removeNoRating();
	}

	onChange(state) {
		this.setState(state);
	}



	render() {

			var titlet = this.state.titles;
			var ogNimet = {};
			var suomiNimet = {};
			for (var i =0; i<titlet.length; i++) {
				var num = titlet[i].originalnimi;

				var num2 = titlet[i].suominimi;
				ogNimet[num] = ogNimet[num] ? ogNimet[num] + 1 : 1;
				suomiNimet[num2] = suomiNimet[num2] ? suomiNimet[num2] + 1 : 1;
			}

			var moment = require('moment');

			let titles = this.state.titles.map((title) => {


				if(ogNimet[title.originalnimi] >1 || suomiNimet[title.suominimi] > 1) {
          if(ogNimet[title.originalnimi] === -1){
					      suomiNimet[title.suominimi] = -1;
								return;
					}
					ogNimet[title.originalnimi] = -1;
					suomiNimet[title.suominimi] = -1;

					var date = moment(title.endtime, moment.ISO_8601);
					var endTimeFmt = moment(date).format('LL');
					if(endTimeFmt === "Invalid date") endTimeFmt = "katsottavissa toistaiseksi";

					return(
						<div className="title col-md-3" key={title.id}>
						<Link className=" " to={'/series/' + title.id}>
						<div className="ribbon"><span>Sarja</span></div>
							<img src={'http://images.cdn.yle.fi/image/upload/w_200,h_200,c_fit/' + title.imgid + ".png"} />
							<p>{title.suominimi}</p>
							<p>Arvosana: {title.rating}</p>
							<p>{endTimeFmt}</p>
						</Link>
					</div>
						)
				}
				if(ogNimet[title.originalnimi] > 0 || suomiNimet[title.suominimi] > 0){

					var date = moment(title.endtime,'YYYY-MM-DD HH:mm Z');
					var endTimeFmt = moment(date).format('LL');
					if(endTimeFmt === "Invalid date") endTimeFmt = "katsottavissa toistaiseksi";


					return (
						<div className="title col-md-3" key={title.id}>
							<Link className="" to={'/titles/' + title.id}>
								<img src={'http://images.cdn.yle.fi/image/upload/w_200,h_200,c_fit/' + title.imgid + ".png"} />

								<p>{title.suominimi}</p>
								<p>Arvosana: {title.rating}</p>
								<p> {endTimeFmt}</p>

							</Link>
						</div>

					)
				}

			});

			return (
					<div id='container'>
					<div className="row">
					<div className="controls col-md-3 col-md-offset-4">
						<button className="btn btn-default" onClick={this.handleSort}>{this.state.sorted ? 'Palauta' : 'Järjestä'}</button>
						<button className="btn btn-default" onClick={this.removeNoRating}>{this.state.rated ? 'Näytä kaikki' : 'Näytä vain arvostellut'}</button>
						<button className="btn btn-default" onClick={this.handleSortByReview}>{this.state.sortedByRated ? 'Laskeva' : 'Nouseva'}</button>
					</div>
					</div>

					{titles}

					</div>
			);
	}
}

export default Home;

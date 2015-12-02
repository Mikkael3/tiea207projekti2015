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


			let titles = this.state.titles.map((title) => {
				if(ogNimet[title.originalnimi] >1 || suomiNimet[title.suominimi] > 1) {
          if(ogNimet[title.originalnimi] === -1){
					      suomiNimet[title.suominimi] = -1;
								return;
					}
					ogNimet[title.originalnimi] = -1;
					suomiNimet[title.suominimi] = -1;

					return(
						<div className="title col-md-4" key={title.id}>
						<Link to={'/titles/' + title.id}>
							<img src={'http://images.cdn.yle.fi/image/upload/w_200,h_200,c_fit/' + title.imgid + ".png"} />
							<p>SARJA</p>
							<p>{title.originalnimi}</p>
							<p>{title.suominimi}</p>
							<p>{title.rating}</p>
							<p>{title.endtime}</p>
							<p>{title.starttime}</p>
						</Link>
					</div>
						)
				}
				if(ogNimet[title.originalnimi] > 0 || suomiNimet[title.suominimi] > 0){
					return (
						<div className="title col-md-4" key={title.id}>
							<Link to={'/titles/' + title.id}>
								<img src={'http://images.cdn.yle.fi/image/upload/w_200,h_200,c_fit/' + title.imgid + ".png"} />
								<p>{title.originalnimi}</p>
								<p>{title.suominimi}</p>
								<p>{title.rating}</p>
								<p>{title.endtime}</p>
								<p>{title.starttime}</p>
							</Link>
						</div>

					)
				}

			});

			return (
					<div id='container'>

					<div id="controls">
						<button className="btn btn-default" onClick={this.handleSort}>{this.state.sorted ? 'Palauta' : 'Järjestä'}</button>
						<button onClick={this.removeNoRating}>{this.state.rated ? 'Näytä kaikki' : 'Näytä vain arvostellut'}</button>
						<button onClick={this.handleSortByReview}>{this.state.sortedByRated ? 'Laskeva' : 'Nouseva'}</button>
					</div>

					{titles}

					</div>
			);
	}
}

export default Home;

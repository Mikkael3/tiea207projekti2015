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

	removeNoRating() {
		
		HomeActions.removeNoRating();
	}

	onChange(state) {
		this.setState(state);
	}



	render() {

			var titlet = this.state.titles;
			var counts = {};
			for (var i =0; i<titlet.length; i++) {
				var num = titlet[i].originalnimi;
				counts[num] = counts[num] ? counts[num] + 1 : 1; 
			}
			//alert(counts["House of Anubis"]);

			let titles = this.state.titles.map((title) => {
				if(counts[title.originalnimi] >1) {
					counts[title.originalnimi] = -1;
					
					return(
						<li className="title" key={title.id}>
						<Link to={'/titles/' + title.id}>
							<img src={'http://images.cdn.yle.fi/image/upload/w_200,h_200,c_fit/' + title.imgid + ".png"} />
							<p>SARJA</p>
							<p>{title.originalnimi}</p>
							<p>{title.suominimi}</p>
							<p>{title.rating}</p>
							<p>{title.endtime}</p>
						</Link>
					</li>
						)
				}
				if(counts[title.originalnimi] === 1){
					return (
						<li className="title" key={title.id}>
							<Link to={'/titles/' + title.id}>
								<img src={'http://images.cdn.yle.fi/image/upload/w_200,h_200,c_fit/' + title.imgid + ".png"} />
								<p>{title.originalnimi}</p>
								<p>{title.suominimi}</p>
								<p>{title.rating}</p>
								<p>{title.endtime}</p>
							</Link>
						</li>

					)
				}

			});

			return (
					<div className='content'>
					
					<div id="controls">
						<button onClick={this.handleSort}>Järjestä</button>
						<button onClick={this.removeNoRating}>Näytä vain arvostellut</button>
					</div>
					{titles}

					</div>
			);
	}
}

export default Home;

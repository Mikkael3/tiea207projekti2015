import React from 'react';
import {Link} from 'react-router';
import SarjaStore from '../stores/SarjaStore';
import SarjaActions from '../actions/SarjaActions';
import Arvostelu from './Arvostelu';
import Trailer from './Trailer';

class Sarja extends React.Component {
	constructor(props) {
		super(props);
		this.state = SarjaStore.getState();
		this.onChange = this.onChange.bind(this);

	}

	componentDidMount() {
		SarjaStore.listen(this.onChange);
		SarjaActions.getTitle(this.props.params.id);



	}

	componentWillUnmount() {
		SarjaStore.unlisten(this.onChange);


	}

	componentDidUpdate(prevProps) {


	}

	onChange(state) {
		this.setState(state);



	}

	getNewSarja(event) {
		//event.preventDefault();
		//alert("asdfasdf");
		SarjaActions.getNewSarja(this.state.originalnimi);
	}



	render() {

		let titles = this.state.jaksot.map((title) => {
			return(
			<div className="title col-md-6" key={title.id}>
				<Link to={'/titles/' + title.id}>
					<img src={'http://images.cdn.yle.fi/image/upload/w_100,h_100,c_fit/' + title.imgid + ".png"} />
					<p>{title.originalnimi}</p>
					<p>{title.kuvaus}</p>
					<p>{title.rating}</p>


				</Link>
			</div>
		);

		});



		return (

			<div className='container'>
				<div className="row">
					<div className="col-md-6">
						<a className="" href={'http://areena.yle.fi/' + this.state.id}>
							<img src={'http://images.cdn.yle.fi/image/upload/w_400,h_400,c_fit/' + this.state.imgid + ".png"} />
						</a>
						<Arvostelu yleid={this.state.id} />
					</div>

					<div className="col-md-6">
						<h2>{this.state.suominimi}</h2>
						<p>Kuvaus: {this.state.kuvaus}</p>

						<p>{this.state.promotiontitle}</p>
						<p>Rating: {this.state.rating}</p>

						<p>Katseluaika: {this.state.endtime}</p>
					</div>
				</div>
				<div>
				<button onClick={this.getNewSarja.bind(this)}>Näytä jaksot</button>
				{titles}
				</div>
			</div>

		);
	}
}

export default Sarja;

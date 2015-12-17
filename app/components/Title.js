import React from 'react';
import {Link} from 'react-router';
import TitleStore from '../stores/TitleStore';
import TitleActions from '../actions/TitleActions';
import Arvostelu from './Arvostelu';
import Trailer from './Trailer';

class Title extends React.Component {
	constructor(props) {
		super(props);
		this.state = TitleStore.getState();
		this.onChange = this.onChange.bind(this);

	}

	componentDidMount() {
		TitleStore.listen(this.onChange);
		TitleActions.getTitle(this.props.params.id);

	}

	componentWillUnmount() {
		TitleStore.unlisten(this.onChange);


	}

	componentDidUpdate(prevProps) {

		if (prevProps.params.titleId !== this.props.params.titleId) {

			TitleActions.getTitle(this.props.params.titleId);
		}

	}

	onChange(state) {
		this.setState(state);
	}


	render() {

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
						<p>Arvosana: {this.state.rating}</p>						
						<p>Katseluaika: {this.state.endtime}</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Title;

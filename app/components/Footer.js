/*
* Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
import React from 'react';
import {Link} from 'react-router';
/*import FooterStore from '../stores/FooterStore';
import FooterActions from '../actions/FooterActions';
*/
class Footer extends React.Component {
	/*
	constructor(props) {
		super(props);
		this.state = FooterStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		FooterStore.listen(this.onChange);
		FooterActions.
	}

	componentWillUnmount() {
		FooterStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}
*/
	render() {
		return (
			<footer id="footer">
				<div className="container">
					<div className="row">
						<div className="col md 6">
						<p>Kolosseum</p>
						</div>
					</div>
				</div>
			</footer>
			);
	}


}

export default Footer;

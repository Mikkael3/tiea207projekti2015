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
class Header extends React.Component {
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
			<header className="header">
			<div className="row">
					<Link className="col-md-1" to='/'>
						<img className="logo" src={'/img/yle.png'}/>
					</Link>
				<h1 className="col-md-6 col-md-offset-4 ">Kolosseum</h1>
			</div>
			</header>
			);
	}


}

export default Header;

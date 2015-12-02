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
			<header id="header">
                        <img src={'https://lh4.googleusercontent.com/b4FE8gcoe1Q7NQJS5fIgSEJFw1Utry_uszUlgoXkgwl1CuhWSIxASMc3IL6b6sgKOI-RGA=w1894-h823'}/>
			<p>Kolosseum</p>
			<p/>
			</header>
			);
	}


}

export default Header;

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
			<img src={'/img/yle.png'}/>
			<h1>Kolosseum</h1>
			</header>
			);
	}


}

export default Header;

import React from 'react';
import Haku from './Haku';
import Footer from './Footer';
import Header from './Header';
import Arvostelu from './Arvostelu'


class App extends React.Component {
	render() {
		return(

			<div id="hcontainer">
			<Header/>
			{this.props.children}
			<Footer />

			</div>
		);
	}
}

export default App;

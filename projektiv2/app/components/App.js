import React from 'react';
import Haku from './Haku';
import Footer from './Footer';


class App extends React.Component {
	render() {
		return(
			<div>
			{this.props.children}
			<Footer />
			
			</div>
		);
	}
}

export default App;

import React from 'react';
import Haku from './Haku';

class App extends React.Component {
	render() {
		return(
			<div>
			{this.props.children}
			<Haku />
			</div>
		);
	}
}

export default App;

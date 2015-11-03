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

	onChange(state) {
		this.setState(state);
	}


  	render() {

  		let titles = this.state.titles.map((title) => {
  			return (
  				<li key={title.titleId}>
  					<Link to={'/titles/' + title.titleId}>
  						<img src={'http://placehold.it/350x150'} />
  						<p>{title.company}</p>
  					</Link>
  				</li>

  			)

  		});

    	return (
      		<div className='alert alert-info'>
        	Hello from Home Component
        	{titles}

      		</div>
    	);
  }
}

export default Home;

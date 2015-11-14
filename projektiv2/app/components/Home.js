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
  				<li key={title.id}>
  					<Link to={'/titles/' + title.id}>
  						<img src={'http://images.cdn.yle.fi/image/upload/w_200,h_200,c_fit/' + title.imgid + ".png"} />
							<p>{title.orginalnimi}</p>
  						<p>{title.suominimi}</p>
  					</Link>
  				</li>

  			)

  		});

    	return (
      		<div className='content'>
        	Hello from Home Component
        	{titles}

      		</div>
    	);
  }
}

export default Home;

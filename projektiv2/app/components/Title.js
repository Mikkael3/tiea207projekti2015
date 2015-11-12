import React from 'react';
import {Link} from 'react-router';
import TitleStore from '../stores/TitleStore';
import TitleActions from '../actions/TitleActions';


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
      		<div className='alert alert-info'>
        	<h2>Name: {this.state.name}</h2>
          <h2>Bio: {this.state.bio}</h2>
          <h2>ID: {this.state.titleId}</h2>
          <h2>Balance: {this.state.balance}</h2>
					<a href={'http://areena.yle.fi/' + this.state.titleId}>
						<img src={'http://placehold.it/350x150'} />
						<p>{this.state.name}</p>
					</a>

      		</div>
    	);
  }
}

export default Title;

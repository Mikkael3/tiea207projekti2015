import React from 'react';
import {Link} from 'react-router';
import TitleStore from '../stores/TitleStore';
import TItleActions from '../actions/TitleActions';


class Title extends React.Component {
	constructor(props) {
		super(props);
		this.state = TitleStore.getState();
		this.onChange = this.onChange.bind(this);

	}

	componentDidMount() {
		TitleStore.listen(this.onChange);
		TitleActions.getTitle();
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
        	<h2>{this.state.name}</h2>
          <h2>{this.state.bio}</h2>
          <h2>{this.state.titleId}</h2>
          <h2>{this.state.balance}</h2>

      		</div>
    	);
  }
}

export default Title;

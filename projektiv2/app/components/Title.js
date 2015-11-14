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
      		<div className='content'>
            
        	   <h2>Originalnimi: {this.state.originalnimi}</h2>
                <h2>Suominimi: {this.state.suominimi}</h2>
                <h2>ID: {this.state.id}</h2>
            	
				<a href={'http://areena.yle.fi/' + this.state.id}>
					<img src={'http://images.cdn.yle.fi/image/upload/w_400,h_400,c_fit/' + this.state.imgid + ".png"} />
					<p>{this.state.name}</p>
					</a>

      		</div>
    	);
  }
}

export default Title;

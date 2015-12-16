import React from 'react';
import {Link} from 'react-router';
import TrailerStore from '../stores/TrailerStore';
import TrailerActions from '../actions/TrailerActions';


class Trailer extends React.Component {


constructor(props) {
  super(props);
  this.state = TrailerStore.getState();
  this.onChange = this.onChange.bind(this);

}

componentDidMount() {
  TrailerStore.listen(this.onChange);

}

componentWillUnmount() {
  TrailerStore.unlisten(this.onChange);


}

componentDidUpdate(prevProps) {



}

onChange(state) {
  this.setState(state);
}


	render() {
	    return (
                   <div>
		    <link rel="stylesheet" type="text/css" href="//cdn.traileraddict.com/css/rembed.css"></link>
		    <div class="outer-embed-ta">
		    <iframe size="40%"  src="//v.traileraddict.com/8873" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" frameborder="0" class="embed-ta">
		    </iframe>
		    </div>
		    <p>
	            <p>Sarja</p>
		    <a href="http://www.traileraddict.com">TrailerAddict</a>
		    </p>
		    </div>
	    );
	}


}

export default Trailer;

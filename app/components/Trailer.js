/*
* Joonas Vilppunen, Markus Muranen, Niko Heikkinen
* MIT Licence
* 2015
*/
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
	if(this.props.trailer !== "" || this.props.trailer !== undefined){
	    return (
                    <div>
		    <p>
	            <a href={this.props.trailer}>Traileri</a>
		    </p>
		    </div>
	    );
	}
	else{
	    return(<p></p>);
	}
	}


}

export default Trailer;

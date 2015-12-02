import React from 'react';
import {Link} from 'react-router';
import ArvosteluStore from '../stores/ArvosteluStore';
import ArvosteluActions from '../actions/ArvosteluActions';


class Arvostelu extends React.Component {


  handleArvostelu(event) {
    event.preventDefault();
      ArvosteluActions.handleArvostelu(this.props.yleid);
  }

constructor(props) {
  super(props);
  this.state = ArvosteluStore.getState();
  this.onChange = this.onChange.bind(this);

}

componentDidMount() {
  ArvosteluStore.listen(this.onChange);

}

componentWillUnmount() {
  ArvosteluStore.unlisten(this.onChange);


}

componentDidUpdate(prevProps) {



}

onChange(state) {
  this.setState(state);
}


	render() {
		return (
            <form id="Arvosteluform">

			<input type="number" id="arvosana" min="0" max="10" ></input>
            <input type="text" id="arvosteluteksti"></input>
            <input type="submit" id="arvostelunappula" value="Arvostele"></input>
            <button onClick={this.handleArvostelu.bind(this)}>Arvostelupainike</button>
            </form>
			);
	}


}

export default Arvostelu;

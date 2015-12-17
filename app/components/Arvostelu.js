import React from 'react';
import {Link} from 'react-router';
import ArvosteluStore from '../stores/ArvosteluStore';
import ArvosteluActions from '../actions/ArvosteluActions';


class Arvostelu extends React.Component {


  handleArvostelu(event) {
    event.preventDefault();

    var tiedot = {
      'yleid' : this.props.yleid,
      'value' : event.target.rating.value
    };
    if(event.target.rating.value === "") {
      toastr.error("Valitse arvosana");
      return;
    }

    ArvosteluActions.handleArvostelu(tiedot);
    ArvosteluActions.getArvosana(this.props.yleid);
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

onChange(state) {
  this.setState(state);
}


	render() {
		return (
      <div>
      <p>Arvosana: {this.state.kolosseumKA}</p>
			<form id="Arvosteluform" onSubmit={this.handleArvostelu.bind(this)}>
			<fieldset class="rating">
			<legend>Arvostele:</legend>
			<input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Kaunis">5 stars</label>
			<input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Juuh">4 stars</label>
			<input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Ok">3 stars</label>
			<input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Melko huono">2 stars</label>
			<input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Huono">1 star</label>
			</fieldset>
      <input className="btn" type="submit" id="arvostelunappula" value="Arvostele"></input>
			</form>
      <span className='help-block'>{this.state.helpBlock}</span>
      </div>
		);
	}


}

export default Arvostelu;

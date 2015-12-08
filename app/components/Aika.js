import React from 'react';
import {Link} from 'react-router';
import AikaStore from '../stores/AikaStore';
import AikaActions from '../actions/AikaActions';

class Aika extends React.Component {

    constructor(props) {
        super(props);
        this.state = AikaStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
      AikaStore.listen(this.onChange);
      //AikaActions.formatDate();
    }

    componentWillUnmount() {
      AikaStore.unlisten(this.onChange);
    }

    componentDidUpdate(prevProps) {
    }

    onChange(state) {
      this.setState(state);
    }

    render() {
        return(
            <p>{this.state.formatedDate}</p>
        );
    }
}

export default Aika;

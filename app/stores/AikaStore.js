import alt from '../alt';
import AikaActions from '../actions/AikaActions';

class AikaStore {
    constructor() {
        this.bindActions(AikaActions);
        //this.actions.formatDate(this.props.endtime);
        //this.formatedDate = "w";
    }

    onFormatDate(date) {
         this.formatedDate = date;
    }
}

export default alt.createStore(AikaStore);

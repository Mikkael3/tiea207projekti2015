import alt from '../alt';

class AikaActions {

    constructor() {
        this.generateActions(
            'formatDate'
        );
    }

    formatDate() {
        this.actions.formatDate();
    }
}

export default alt.createActions(AikaActions);

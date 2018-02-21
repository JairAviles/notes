import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChanges } from '../imports/routes/routes';
import createBrowserHistory from 'history/createBrowserHistory'
import './../imports/startup/simple-schema-configuration';

const history = createBrowserHistory();

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChanges(isAuthenticated);
});

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    if (selectedNoteId) {
        history.replace(`/dashboard/${selectedNoteId}`);
    }
});

Meteor.startup(() => {
    Session.set('selectedNoteId', undefined);
    ReactDOM.render(routes, document.getElementById('app'));
});
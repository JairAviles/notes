import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { AppRouter, history } from '../imports/routes/AppRouter';
import createBrowserHistory from 'history/createBrowserHistory'
import './../imports/startup/simple-schema-configuration';

Tracker.autorun(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Session.set('isNavOpen', false);

    if (selectedNoteId) {
        history.replace(`/dashboard/${selectedNoteId}`);
    }
});

Tracker.autorun(() => {
    const isNavOpen = Session.get('isNavOpen');
    document.body.classList.toggle('is-nav-open', isNavOpen);
});    

Meteor.startup(() => {
    Session.set('selectedNoteId', undefined);
    Session.set('isNavOpen', false);
    ReactDOM.render(<AppRouter />, document.getElementById('app'));
});
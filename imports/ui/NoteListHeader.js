import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from './../api/notes';

export const NoteListHeader = (props) => {
    return (
        <div className="item-list__header">
            <button className="button" onClick={() => {
                props.meteorCall('notes.insert', (err, res) => {
                    if (res) {
                        props.Session.set('selectedNoteId', res);
                    }
                });
            }}>Create Note</button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
};

export default withTracker(() => {
    return {
        meteorCall: Meteor.call,
        Session
    };
})(NoteListHeader);
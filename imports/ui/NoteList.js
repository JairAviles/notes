import React from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

import { Notes } from './../api/notes';

export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader />
            {props.notes.map((note) => {
                return <NoteListItem key={note._id} note={note}/>;
             })}
             NoteList { props.notes.length }
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default withTracker(() => {
    Meteor.subscribe('notesPub');
    return {
        notes: Notes.find().fetch()
    };
})(NoteList);
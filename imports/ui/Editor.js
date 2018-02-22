import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

import { Notes } from '../api/notes';

export class Editor extends React.Component {

    handleTitleChange(e) {
        this.props.call('notes.update', (this.props.note._id), {
            title: e.target.value
        });
    }

    handleBodyChange(e) {
        this.props.call('notes.update', (this.props.note._id), {
            body: e.target.value
        });
    }

    render() {
        if (this.props.note) {
            return (
                <div>
                    <input value={this.props.note.title} 
                        placeholder="Your title here!"
                        onChange={this.handleTitleChange.bind(this)} />
                    <textarea 
                        value={this.props.note.body} 
                        placeholder="Your note here!"
                        onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button>Delete Note</button>
                </div>
            );
        } else {
            return (
                <p>
                    { this.props.selectedNoteId ? 'Note not found!': 'Create a note!' }
                </p>
            );
        }
    }
}

Editor.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string,
    call: PropTypes.func,
    history: PropTypes.object,
    Session: PropTypes.object
};

export default withRouter(withTracker(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
      selectedNoteId,
      note: Notes.findOne(selectedNoteId),
      call: Meteor.call,
      Session
    };
  })(Editor));
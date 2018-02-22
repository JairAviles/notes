import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

import { Notes } from '../api/notes';

export class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
    }

    handleTitleChange(e) {
        const title  = e.target.value;
        this.setState({ title });
        this.props.call('notes.update', (this.props.note._id), { title });
    }

    handleBodyChange(e) {
        const body  = e.target.value;
        this.setState({ body });
        this.props.call('notes.update', (this.props.note._id), { body });
    }

    handleRemoval() {
        this.props.call('notes.remove', this.props.note._id);
        this.props.history.push('/dashboard');
      }

    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
    
        if (currentNoteId && currentNoteId !== prevNoteId) {
          this.setState({
            title: this.props.note.title,
            body: this.props.note.body
          });
        }
    }

    componentDidMount() {
        if (this.props.match) {
          this.props.Session.set('selectedNoteId', this.props.match.params.id)
        }
      }

    render() {
        if (this.props.note) {
            return (
                <div>
                    <input 
                        value={this.state.title} 
                        placeholder="Your title here!"
                        onChange={this.handleTitleChange.bind(this)} />
                    <textarea 
                        value={this.state.body}
                        placeholder="Your note here!"
                        onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button onClick={this.handleRemoval.bind(this)}>Delete Note</button>
                </div>
            );
        } else {
            return (
                <p>
                    {this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
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
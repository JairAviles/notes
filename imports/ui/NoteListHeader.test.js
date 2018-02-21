import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { NoteListHeader } from './NoteListHeader';

if(Meteor.isClient) {
    let meteorCall;

    beforeEach(function () {
        meteorCall = expect.createSpy();
      });

    describe('NoteListHeader', function() {
        it('should call meteorCall on click', function() {
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} />);

            wrapper.find('button').simulate('click');

            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert')
        });
    });    
}    
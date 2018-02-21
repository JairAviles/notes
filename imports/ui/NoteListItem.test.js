import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import NoteListItem from './NoteListItem';

if(Meteor.isClient) {
    describe('NoteListItem', function() {
        it('should render title and timestamp', function() {
            const title = 'My title here';
            const updatedAt = 1519236882929;
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }}  />);
            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('21/02/2018');
        });

        it('should set default title if no title set', function() {
            const title = undefined;
            const updatedAt = 1519236882929;
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }}/>);

            expect(wrapper.find('h5').text()).toBe('Untitled note');
        });
    });
}        
import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import { Signup } from './Signup';

if(Meteor.isClient) {
    describe('Signup', function() {
        it('should show error message', function() {
            const error = 'This is not working';
            const wrapper = shallow(<Signup createUser={() => { }} />);
      
            wrapper.setState({ error });
            expect(wrapper.find('p').text()).toBe(error);
      
            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
            
        });

        it('should call createUser with the form data', function() {
            const email = 'jair@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = shallow(<Signup createUser={spy}/>);

            wrapper.setState({ email, password });
            wrapper.find('form').simulate('submit', { preventDefault: () => { } });

            expect(spy.calls[0].arguments[0]).toEqual({ email, password });

        });

        it('should set error if short password', function() {
            const email = 'andrew@test.com';
            const password = '123                       ';
            const spy = expect.createSpy();
            const wrapper = shallow(<Signup createUser={spy} />);

            wrapper.find({ name: 'email' }).simulate('change', {
                target: {
                  value: email
                }
              });
              wrapper.find({ name: 'password' }).simulate('change', {
                target: {
                  value: password
                }
              });
              wrapper.find('form').simulate('submit', { preventDefault: () => { } });
        
              expect(wrapper.state('error').length).toBeGreaterThan(0);
        });

        it('should set createUser callback errors', function () {
            const password = 'password123!';
            const reason = 'This is why it failed';
            const spy = expect.createSpy();
            const wrapper = shallow(<Signup createUser={spy} />);
      
            wrapper.setState({ password })
            wrapper.find('form').simulate('submit', { preventDefault: () => { } });
      
            spy.calls[0].arguments[1]({ reason });
            expect(wrapper.state('error')).toBe(reason);
      
            spy.calls[0].arguments[1]();
            expect(wrapper.state('error').length).toBe(0);
          });

    });
}
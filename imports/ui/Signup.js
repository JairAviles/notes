import React from 'react';
import PropTypes from 'prop-types';

import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Accounts } from 'meteor/accounts-base';

export class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            email: '',
            password: ''
        };
    }

    onSubmit(e) {
        let { email, password } = this.state;

        e.preventDefault();

        if (password.length < 9) {
            return this.setState({error: 'Password must be more than 8 characters long'});
        }

        this.props.createUser({email, password}, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
        });

    }

    onEmailChange(e) {
        this.setState({ email: e.target.value.trim() })
      }
      onPasswordChange(e) {
        this.setState({ password: e.target.value.trim() })
      }

    componentWillMount() {
        if (Meteor.userId()) {
            this.props.history.replace("/links"); 
        }    
    }

    render() {
        return  (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1> Join</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}
    
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <input type="email" name="email" ref="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} value={this.state.email} />
                        <input type="password" name="password" ref="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)} value={this.state.password} />
                        <button className="button">Create Account</button>
                    </form>

                    <Link to="/">Already have an account?</Link>
                    </div>    

            </div>
        );
    }
}    

Signup.propTypes = {
    createUser: PropTypes.func.isRequired
};

export default withTracker(() => {
    return {
        createUser: Accounts.createUser
    };
})(Signup);
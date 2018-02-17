import React from 'react';
import { withRouter } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Meter } from 'meteor/meteor';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: this.props.error || ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        
        Meteor.loginWithPassword({email}, password, (err) => {
            if (err) {
                this.setState({error: err.reason});
            } else {
                this.setState({error: ''});
            }
        });
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
                    <h1>Login</h1>
                    
                        {this.state.error ? <p>{this.state.error}</p> : undefined}

                        <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                            <input type="email" name="email" ref="email" placeholder="Email" />
                            <input type="password" name="password" ref="password" placeholder="Password" />
                            <button className="button">Login</button>
                        </form>

                    <Link to="/signup">Create an account?</Link>
                </div>

            </div>
        );
    }
}    

export default withRouter(Login);
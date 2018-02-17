import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Dashboard from './../ui/Dashboard';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';
import Signup from './../ui/Signup';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];
const history = createBrowserHistory();

const onEnterPublicPage = () => {
    if (!Meteor.userId()) {
        history.replace("/");
    }
};

const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        history.replace("/dashboard");
    }
}

export const onAuthChanges = (isAuthenticated) => {
    const pathname = location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const isAuthenticatedPage = authenticatedPages.includes(pathname);

    if (isUnauthenticatedPage && isAuthenticated) {
        history.replace("/dashboard");
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace("/");
    }
};

export const routes = (
    <Router history={ history } forceRefresh={true}>
        <div>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/dashboard" component={Dashboard}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

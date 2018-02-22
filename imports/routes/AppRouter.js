import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Dashboard from './../ui/Dashboard';
import Login from './../ui/Login';
import NotFound from './../ui/NotFound';
import Signup from './../ui/Signup';

export const history = createBrowserHistory();

export const AppRouter = () => (
    <Router history={ history } forceRefresh={true}>
        <div>
            <Switch>
                <PublicRoute exact path="/" component={Login} />
                <PublicRoute path="/signup" component={Signup} />
                <PrivateRoute path="/dashboard" component={Dashboard}/>
                <PrivateRoute path="/dashboard/:id" component={Dashboard}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
  );
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
        isAuthenticated,
        component: Component,
        ...rest
     }) => (
      <Route {...rest} render={(props) => (
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
            <Component {...props} />
          )
      )} />
    );

  export default withTracker(() => {
    return {
      isAuthenticated: !!Meteor.userId()
    };
})(PublicRoute);
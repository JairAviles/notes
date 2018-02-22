import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
            isAuthenticated,
            component: Component,
            ...rest
        }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

export default withTracker(() => {
    return {
      isAuthenticated: !!Meteor.userId()
    };
})(PrivateRoute);
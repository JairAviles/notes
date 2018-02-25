import React from 'react';
import PropTypes from 'prop-types';

import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {
    const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg' ;

    return (
        <div className="header">
            <div className="header__content" onClick={() => props.handleNavToogle()}>
                <img className="header__nav-toogle" src={navImageSrc} />
                <h1 className="header__title ">{props.title}</h1>
                <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
            </div>    
        </div>
    );
};

 PrivateHeader.propTypes = {
     title: PropTypes.string.isRequired,
     handleLogout: PropTypes.func.isRequired,
     handleNavToogle: PropTypes.func.isRequired,
     isNavOpen: PropTypes.bool.isRequired
};

export default withTracker(() => {
    return {
        handleLogout: () => Accounts.logout(),
        handleNavToogle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
        isNavOpen: Session.get('isNavOpen')
    };
})(PrivateHeader);
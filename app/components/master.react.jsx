'use strict';

/** @jsx React.DOM */

var React = require('react');
var Router       = require('react-router');
var RouteHandler = Router.RouteHandler;
var Header      = require('./header/header.react.jsx');
var AppStore = require('../stores/appStore');

function getCurrentUser() {
  return {
    currentUser : AppStore.getCurrentUser(),
    userState   : AppStore.getUserState()
  };
}

function isAuthenticated(_this, userState) {
  // ============ if user state is not set , this will redirect people to the default 
  // sign up page
  userState = userState ||  _this.state.userState;
  var state = userState;
  console.log("USER STATE ----------> " + userState );

    if(state != 'pending') {
      if( !state && _this.getPath() != '/' ) {
        _this._onUnauthenticated();
      }
    }
  
}


var Master = React.createClass({
  mixins: [Router.Navigation, Router.State],

  getInitialState: function() {
    return getCurrentUser();
  },

  componentWillMount: function() {
    isAuthenticated(this);
  },

  componentDidMount: function() {

    AppStore.getCurrentUserOnStart();
    // when user is logged in , the appstore will tigger a userAuth event, this passes in the 
    // call back into the lister, the when userAuth --> _.onUserAuth will run
    AppStore.addUserAuthListener(this._onUserAuth);
    AppStore.addLogoutListener(this._onLogout);
    AppStore.addPersonalPageListener(this._onPersonalPage)

  },

  componentWillUpdate: function(nextProps, nextState) {
    isAuthenticated(this, nextState.userState);
  },

  componentDidUnmount: function() {
    AppStore.removeLogoutListener();
    AppStore.removeUserAuthListener();

  },

  render: function() {
    var appCanvas = <div className=''>
                      <Header user={this.state.currentUser} userState={this.state.userState}/>
                      <RouteHandler user={this.state.currentUser}/>
                    </div>;
    if( this.getPath() == '/') {
      return appCanvas;
    } else if( this.state.userState == 'pending' && this.getPath() != '/' || !this.state.userState) {
      return (
        <div>
          <div>
            <i className="fa fa-refresh fa-spin"></i>
          </div>
        </div>
        );
    } else {
      return appCanvas;
    }
  },

  _onUserAuth: function() {
    this.setState(getCurrentUser(), function() {
      this.transitionTo('profile');
    });
  },

  _onUnauthenticated: function() {
    this.transitionTo('/');
  },

  _onLogout: function() {
    this.setState(getCurrentUser(), function() {
      this.transitionTo('/');       
    });
  },
  _onPersonalPage: function(){
    this.transitionTo('personalPage');
  }

});

module.exports = Master;
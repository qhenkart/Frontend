'use strict';

/** @jsx React.DOM */

var React  = require('react');
var Router = require('react-router');
var app = require('../../../stores/appStore');

var PersonalPage = React.createClass({

  mixins: [Router.Navigation, Router.States],

  getInitialState: function() {
    return {
      //username : 'TEST USER',
      username : this.props.user.username,
      myLinks: this.props.user.links,
      userpic  : ''
    }
  },

  componentWillMount: function() {
      //********* FETCH ALL THE LINKS THAT BELONG TO THE USER************* 
      app.fetchMyLinks(this.state.username);
  },

  // componentDidMount: function() {
  //   app.addOnGetLinksListener(this._onGetLinks);
  // },

  // componentWillUnmount: function() {
  //   app.removeOnGetLinksListener(this._onGetLinks);
  // },

  render: function() {
    console.log("##################################### list of all links");
    console.dir(this.state.myLinks);
    var myLinks = this.state.myLinks.map(function(item){
      return (
        <p>{item}</p>
        );
    });
  
    return  (
    <div className="container profileContainer">
      <div className="row">

          <div className="col-md-4">
              <button className='btn btn-lg btn-primary' type='button' onClick={this._goToAddCode}>Add Code</button>
          </div>
      </div>
      <div className="row"> 
          <p>{this.state.username}</p>
          {myLinks}
      </div>
    </div>
    );

  },
  
  _onGetLinks: function() {
    var username = this.state.username;
    this.setState({
      username : username,
    });
  },

  _goToAddCode: function() {
    this.transitionTo('addCode');
  },

});

module.exports = PersonalPage;



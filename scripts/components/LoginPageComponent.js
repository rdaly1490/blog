var React = require('react');
var _ = require("underscore");
// var $ = require("jquery");

// var loginModel = require("../models/UserModel");

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors: {}
		}
	},
	render: function() {
		return (
			<div>
				<form onSubmit={this.loginUser}>
					<input ref="username" type="text" placeholder="username" />
					<p>{this.state.errors.username}</p>
					<input ref="password" type="password" placeholder="password" />
					<p>{this.state.errors.password}</p>
					<button>Login</button>
					<p>{this.state.errors.incorrect}</p>
				</form>
				<button onClick={this.goToRegister}>Register</button>
			</div>
		);
	},
	goToRegister: function(e) {
		e.preventDefault();
		this.props.myRouter.navigate("register", {trigger:true});
	},
	loginUser: function(e) {
		var that = this;
		e.preventDefault();

		var err = {};

		// var loggedIn = new loginModel();
		var userValue = (this.refs.username.getDOMNode().value).toLowerCase();
		var pw = this.refs.password.getDOMNode().value
		
		if(!userValue) {
			err.username = "Username cannot be left blank"
		}
		if(!pw) {
			err.password = "Password cannot be left blank"
		}

		this.setState({errors:err});

		if(_.isEmpty(err)) {
			this.props.user.login({
				username: userValue,
				password: pw
			},{
				success: function(userModel) {
	        	console.log('user was logged in');
	        	that.props.myRouter.navigate("home", {trigger:true});
	        	// $("#welcome").html("Welcome" + " " + userValue);
	    	},
	    		error: function(userModel, response) {
	    		console.log(response.responseJSON)
				if(response.responseJSON.error) {
					err.incorrect = "Incorrect Username or Password";

		        	that.setState({errors:err});
	        	}
	   		}

			});
		}
	}
});
var React = require('react');
var _ = require("underscore");
var $ = require("jquery");

var BlogPostCollection = require("../collections/BlogPostCollection");

module.exports = React.createClass({
	getInitialState: function() {

		var that=this;

		var BlogHistory = new BlogPostCollection();
		BlogHistory.fetch({
			success: function() {
				that.forceUpdate();
			}
		});

		BlogHistory.on("sync", function() {
			that.forceUpdate();
		});

		return {
			errors: {},
			blogHistory: BlogHistory
		}
	},
	componentWillMount: function() {
		var that=this;
		this.props.user.on("change", function() {
			that.forceUpdate();
		});
	},
	render: function() {
		var welcome = ("Welcome" + " " + this.props.user.attributes.username);

		var blogFeedHome = this.state.blogHistory.map(function(blogModel) {
			return (
				<div key={blogModel.cid}>
					<h3>{blogModel.get("title")}</h3>
					<p>{blogModel.get("body")}</p>
					<p> {blogModel.get("category")} </p>
				</div>
			);
		});
		
		return (
			<div>
				<div>{welcome}</div>
				<p>Welcome to the home page brah</p>
				<p>Lorem ipsum Veniam quis nostrud id reprehenderit ex dolor do reprehenderit dolore in irure.</p>
				<button onClick={this.logOut}>Log Out</button>
				<p></p>
				<button onClick={this.submitPost}>Submit Blog Post </button>
				<div> {blogFeedHome} </div>
			</div>
		);
	},
	logOut: function() {
			var that = this;
			this.props.user.logout({
				success: function(userModel) {
		        	console.log('user was logged out');
		        	that.props.myRouter.navigate("login", {trigger:true});
	    	},
	    		error: function(userModel, response) {
	    			console.log(response.responseJSON)
					that.props.myRouter.navigate("login", {trigger:true});
	   		}

			});
	},
	submitPost: function() {
		this.props.myRouter.navigate("submitpost", {trigger:true});	
	}
});
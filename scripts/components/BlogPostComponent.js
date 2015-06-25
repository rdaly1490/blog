var React = require('react');

var postModel = require("../models/BlogPostModel")

module.exports = React.createClass({
	getInitialState: function() {
		var that = this;
		var post = new postModel({
			objectId: this.props.postId 
		});
		post.fetch();

		post.on("change", function() {
			that.forceUpdate();
		});
		return {
			post: post
		}
	},
	render: function() {
		return (
			<div>
				<h3> {this.state.post.get("title")}</h3>
				<p> {this.state.post.get("body")}</p>
				<a href="#home">{this.state.post.get("category")}</a> <br />
				<button onClick={this.goHome}>Go Home</button>
			</div>
		);
	},
	goHome: function() {
		this.props.myRouter.navigate("home", {trigger:true});
	}
});
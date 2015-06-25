var React = require('react');
var _ = require("underscore");

var PostModel = require("../models/BlogPostModel")

module.exports = React.createClass({
	getInitialState: function() {
		return {
			errors: {}
		}
	},
	render: function() {
		return (
			<form>
				<input type="text" ref="title" />
				<p></p>
				<input type="text" ref="body" />
				<p></p>
				<select ref="category">
					<option value="">--Choose an option--</option>
					<option value="javascript">JavaScript</option>
					<option value="ruby">Ruby</option>
					<option value="node">Node.js</option>
					<option value="random">Random</option>
				</select><br />
				<button onClick={this.submitPost}>Submit Post</button>
			</form>
		);
	},
	submitPost: function(e) {
		e.preventDefault();
		var that = this;
		var post = new PostModel ({
			title:this.refs.title.getDOMNode().value,
			body: this.refs.body.getDOMNode().value,
			category: this.refs.category.getDOMNode().value
		});
		post.save(null,
			{
				success: function(model) {
					var postId = model.attributes.objectId;
					that.props.myRouter.navigate("post/"+postId, {trigger:true});
				},
				error: function(model) {
					console.log("Doesn't work");
				}
			}
		);
	}
});



// regex: .*first*.
// . will match every character
// * will 
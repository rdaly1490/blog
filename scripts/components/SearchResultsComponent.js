var React = require('react');

var BlogPostCollection = require("../collections/BlogPostCollection");

module.exports = React.createClass({
	getInitialState: function() {
		var query = {};
		query[this.props.choice] = {$regex: ".*"+this.props.query+".*"}
		var that = this;
		console.log(this.props.query)
		var SearchResults = new BlogPostCollection();
		SearchResults.fetch({
			query: query,

			success: function() {
				that.forceUpdate();
			}
		});

		return {
			searchResults:SearchResults
		}
	},
	render: function() {
		console.log(this.state.searchResults);
		if(this.state.searchResults.length>0) {
			var results = this.state.searchResults.map(function(model) {
				return (
					<div key={model.cid}>
						<h3>{model.get("title")}</h3>
						<p>{model.get("body")}</p>
						<p> {model.get("category")} </p>
					</div>
				);
			});
		}
		else {
			var results = <h1>No results found</h1>
		}

		return (
			<div>
				{results}
				<button onClick={this.goHome}>Go Home</button>
			</div>
		);
	},
	goHome: function(e) {
		e.preventDefault();
		this.props.myRouter.navigate("home", {trigger: true});
	}
});
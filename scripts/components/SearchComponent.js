var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<form onSubmit={this.searchQuery}>
				<input ref="search" type="text" placeholder="search" />
				<label>Category</label><input ref="category" type="radio" name="choice" value="category" />
				<label>Title</label><input defaultChecked ref="title" type="radio" name="choice" value="title" />
				<button>Search up in hurr</button>
			</form>
		);
	},
	searchQuery: function(e) {
		e.preventDefault();
		var choice = null

		if(this.refs.category.getDOMNode().checked) {
			choice ="category"
		}
		else {
			choice="title"
		}
		var searchCategory = this.refs.search.getDOMNode().value;
		console.log(searchCategory);
		this.props.myRouter.navigate("searchresults/"+searchCategory+"/"+choice, {trigger:true});
	}
});
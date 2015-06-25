var parseSettings = require("../../config/parse");
var Backbone = require("backparse")(parseSettings);

module.exports = Backbone.Model.extend({
	defaults: {
		title:"",
		body:"",
		category:""
	},
	parseClassName: "blog_post",
	idAttribute: "objectId",
	isUser: false
});
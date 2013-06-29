define(['backbone', 'knockout', 'bennu-knockout'], 
	function(Backbone, ko, bennuKo) {

	return Backbone.Router.extend({
		routes: {
			'': 'index',
			'create': 'create'
		},

		index: function() {
			bennuKo.LoadPage({
				transactions: ko.observable([{ 'description' : 'blah blah'}])
			}, "LongTxManagement");
		}
	});

});
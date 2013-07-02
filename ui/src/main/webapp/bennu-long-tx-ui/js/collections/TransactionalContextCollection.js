define(['backbone', 'models/TransactionalContextModel'], function(Backbone, TransactionalContextModel) {

	return Backbone.Collection.extend({
		url: '../api/bennu-long-tx/longTx/',

		model: TransactionalContextModel,

		parse: function(response) {
			return response.longTx;
		},

		comparator: function(model) {
			return model.get('name');
		}		
	});

});

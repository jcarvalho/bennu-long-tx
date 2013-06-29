define(['backbone', 'models/TransactionalContextModel'], function(Backbone, TransactionalContextModel) {

	return Backbone.Collection.extend({
		urlRoot: '../api/bennu-long-tx/longTx/',
		model: TransactionalContextModel
	});

});

define(['knockout', 'models/TransactionalContextModel'], function (ko, TransactionalContextModel) {

	return function(TransactionalContextCollection) {

		this.description = ko.observable('');

        this.create = function() {
        	var model = new TransactionalContextModel({ name: this.description() });
        	model.save(null, {
        		success: function() {
        			TransactionalContextCollection.add(model);
        		}
        	});
        };

	};

});
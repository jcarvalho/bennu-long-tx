define(['knockout', 'knockback', 'models/TransactionalContextModel'], function (ko, kb, TransactionalContextModel) {

	return function(TransactionalContextCollection) {

		this.transactions = kb.collectionObservable(TransactionalContextCollection, kb.ViewModel);
		this.description = ko.observable('');
        this.create = function() {
        	var model = new TransactionalContextModel({ name: this.description() });
        	model.save(null, {
        		success: function() {
        			debugger;
        			TransactionalContextCollection.add(model);
        		}
        	});
        }
	}

});

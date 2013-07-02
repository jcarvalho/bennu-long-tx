define(['jquery', 'knockout', 'knockback', 'models/TransactionalContextModel'], function ($, ko, kb, TransactionalContextModel) {

	return function(TransactionalContextCollection) {

		this.transactions = kb.collectionObservable(TransactionalContextCollection, kb.ViewModel);
		this.description = ko.observable('');
        this.create = function() {
        	var model = new TransactionalContextModel({ name: this.description() });
        	model.save(null, {
        		success: function() {
        			TransactionalContextCollection.add(model);
        		}
        	});
        };

        this.commit = function(model) {
        	$.ajax({
        		type: 'GET',
        		url: '../api/bennu-long-tx/longTx/commit/' + model.model().get('id'),
        		success: function() {
        			alert("SUCCESS!");
        		}
        	});
        };

        this.rollback = function(model) {
        	$.ajax({
        		type: 'GET',
        		url: '../api/bennu-long-tx/longTx/rollback/' + model.model().get('id'),
        		success: function() {
        			TransactionalContextCollection.remove(model.model());
        		}
        	});
        };

        this.activate = function(model) {

        };

        this.deactivate = function(model) {

        };
	}

});

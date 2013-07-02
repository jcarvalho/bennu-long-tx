define(['jquery', 'knockout', 'knockback', 'models/TransactionalContextModel'], function ($, ko, kb, TransactionalContextModel) {

    return function(TransactionalContextCollection) {

        this.transactions = kb.collectionObservable(TransactionalContextCollection, kb.ViewModel);

        this.commit = function(model) {
            $.ajax({
                type: 'GET',
                url: '../api/bennu-long-tx/longTx/commit/' + model.model().get('id'),
                success: function() {
                    TransactionalContextCollection.remove(model.model());
                }
            });
        };

        this.rollback = function(model) {
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: '../api/bennu-long-tx/longTx/rollback/' + model.model().get('id'),
                success: function() {
                    TransactionalContextCollection.remove(model.model());
                }
            });
        };

        this.activate = function(model) {
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: '../api/bennu-long-tx/longTx/activate/' + model.model().get('id'),
                success: function() {
                    model.model().set('activated', true);
                }
            });
        };

        this.deactivate = function(model) {
            $.ajax({
                type: 'GET',
                dataType: 'text',
                url: '../api/bennu-long-tx/longTx/deactivate',
                success: function() {
                    model.model().set('activated', false);
                }
            });
        };
    }

});

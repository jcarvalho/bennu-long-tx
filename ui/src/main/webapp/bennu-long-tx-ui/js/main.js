requirejs.config({
    paths: {
        // Backbone
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        knockback: 'libs/knockback-core'
    },
    shim: {
        "underscore": {
            deps: [],
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
    }
});

require(['knockout', 
         'bennu-knockout',
         'collections/TransactionalContextCollection',
         'viewModels/TransactionalContextViewModel',
         'viewModels/NewTxViewModel'], function(ko, bennuKo, TrasactionalContextCollection, TransactionalContextViewModel, NewTxViewModel) {

        var collection = new TrasactionalContextCollection();
        collection.fetch({
            success: function () {
                collection.sort();
                var viewModel = new TransactionalContextViewModel(collection);
                var modalViewModel = new NewTxViewModel(collection);
                bennuKo.loadPage('mainView', viewModel, 'LongTxManagement');
                bennuKo.loadPage('newTxModal', modalViewModel, 'NewTxModal');
            }
        });
});

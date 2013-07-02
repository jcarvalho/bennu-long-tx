requirejs.config({
    paths: {

        // bennu-knockout dependencies
        jquery: '../../bennu-knockout/libs/jquery',
        i18n: '../../bennu-knockout/libs/i18n',
        knockout: '../../bennu-knockout/libs/knockout',
        'bennu-knockout': '../../bennu-knockout/bennu-knockout',
        
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
    }, 
    config: {
        i18n: {
            'locale': BennuPortal.locale.tag.toLowerCase()
        }
    }
});

require(['knockout', 
         'bennu-knockout',
         'collections/TransactionalContextCollection',
         'viewModels/TransactionalContextViewModel',
         'viewModels/NewTxViewModel'], function(ko, bennuKo, TrasactionalContextCollection, TransactionalContextViewModel, NewTxViewModel) {

		bennuKo.initialize();
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

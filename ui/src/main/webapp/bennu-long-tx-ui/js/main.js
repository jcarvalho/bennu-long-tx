requirejs.config({
    paths: {
        jquery: 'libs/jquery',
        i18n: 'libs/i18n',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        knockout: 'libs/knockout',
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
         'viewModels/TransactionalContextViewModel'], function(ko, bennuKo, TrasactionalContextCollection, TransactionalContextViewModel) {

		bennuKo.initialize();
        var collection = new TrasactionalContextCollection();
        collection.fetch({
            success: function () {
                collection.sort();
                var viewModel = new TransactionalContextViewModel(collection);
                bennuKo.LoadPage(viewModel, 'LongTxManagement');
            }
        });
});

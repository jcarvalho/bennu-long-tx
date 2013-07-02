requirejs.config({
    paths: {
        jquery: '../../bennu-knockout/libs/jquery',
        i18n: '../../bennu-knockout/libs/i18n',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        knockout: '../../bennu-knockout/libs/knockout',
        knockback: 'libs/knockback-core',
        'bennu-knockout': '../../bennu-knockout/bennu-knockout'
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

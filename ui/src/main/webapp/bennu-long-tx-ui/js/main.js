BennuPortalInitializer.registerCallback(function (portal) {

    requirejs.config({
        paths: {
            jquery: 'libs/jquery',
            i18n: 'libs/i18n',
            backbone: 'libs/backbone',
            underscore: 'libs/underscore',
            knockout: 'libs/knockout'
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
                'locale': portal.locale.tag.toLowerCase()
            }
        }
    });

    require(['backbone','knockout', 'bennu-knockout'], function(Backbone, ko, bennuKo) {

    		bennuKo.initialize();
            bennuKo.LoadPage({
                transactions: ko.observable([{ 'description' : 'blah blah', selected: false}, { description: 'bleh bleh', selected: true}]),
                description: ko.observable(''),
                create: function() {
                    alert("Creating with description " + description());
                }
            }, "LongTxManagement");

    });

});

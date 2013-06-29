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
    }
});

require(['backbone','knockout', 'bennu-knockout', 'router'], function(Backbone, ko, bennuKo, Router) {

	setTimeout(function () {
		bennuKo.initialize();
		new Router();
		Backbone.history.start();
	}, 500);

});

define(['jquery', 'knockout', 'i18n!nls/messages'], function($, ko, messages) {

	var templateModel = {
		template: ko.observable(),
		selectedViewModel: ko.observable(null)
	};

	var getTemplate = function(templateName, callback) {
		var fullUrl = 'template/' + templateName + '.html';
		console.log("Fetching: " + fullUrl);
		$.ajax({
			type: "GET",
			url: fullUrl,
			dataType: "text",
			success: function(template, status, response) {
				callback(template, status, response);
			}
		});
	};

	ko.bindingHandlers.app = {
	    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	        // This will be called when the binding is first applied to an element
	        // Set up any initial state, event handlers, etc. here
			$(element).append("<div id='bennu-ko-container'></div>");
	    },
	    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			var templateName = viewModel.template();
			if(templateName) {
				getTemplate(templateName, function(template) {
					var el = $(element).find("#bennu-ko-container");
					el.html(template);
					ko.cleanNode(el[0]);
					ko.applyBindings(viewModel.selectedViewModel(), el[0]);
				});
			}
	    }
	};

	var getMessage = function(key) {
		if(messages[key]) {
			return messages[key];
		} else {
			return '!i18n!' + key + '!/i18n!';
		}
	}

	ko.bindingHandlers.i18n = {
	    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			$(element).html(getMessage(valueAccessor()));
	    },
	    update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

	    }
	}

	return {

		LoadPage: function(viewModel, template) {
			templateModel.selectedViewModel(viewModel);
			templateModel.template(template);
		},

		initialize: function() {
			ko.applyBindings(templateModel);
		}

	};
});

var emptyItem = {
	'title' : '',
	'text' : 'nothing selected'
};

var possibleServerCalls = [ {
	'title' : 'GET: /ajax/tasks',
	'text' : 'get all'
}, {
	'title' : 'GET: /ajax/tasks/:id',
	'text' : 'get a specific task by id'
}, {
	'title' : 'POST: /ajax/tasks/new',
	'text' : 'make a new task'
}, {
	'title' : 'POST: /ajax/tasks/:id/delete',
	'text' : 'delete a task by id'
} ];

function ReadmeViewModel() {
	var self = this;
	self.calls = ko.observableArray(possibleServerCalls);
	self.currentItem = ko.observable(emptyItem);

	self.getAnItem = function(theItem) {
		self.currentItem(theItem);
	}

	self.init = function() {

	}
	self.init();
}
$(function() {
	if (typeof ko !== "undefined") {
		ko.applyBindings(new ReadmeViewModel());
	}
});

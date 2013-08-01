var emptyItem = {
	'title' : '',
	'text' : 'nothing selected'
};

var possibleServerCalls = [ {
	'title' : 'GET: /tasks',
	'text' : 'get all the tasks as an array of objects.'
}, {
	'title' : 'GET: /tasks/:id',
	'text' : 'get a specific task by id as JSON'
}, {
	'title' : 'POST: /tasks/new',
	'text' : 'make a new task'
}, {
	'title' : 'POST: /tasks/:id/delete',
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

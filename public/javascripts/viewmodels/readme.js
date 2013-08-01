var emptyItem = {
	'title' : '',
	'text' : 'nothing selected'
};

<<<<<<< HEAD
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
=======
var possibleServerCalls = [
		{
			'title' : 'GET: /ajax/tasks',
			'text' : 'Get all the tasks from the server. It will return an array of JSON. The form is as follows:'
					+ '[{"taskId":4,"title":"Some title","text":"an optional description"},{"taskId":5,"title":"Another title","text":"an optional description"}]'
		},
		{
			'title' : 'GET: /ajax/tasks/:id',
			'text' : 'Get a specific task by id. Returns JSON: {"taskId":4,"title":"A task","text":"a description"}'
		},
		{
			'title' : 'POST: /ajax/tasks/new',
			'text' : 'Make a new task. This will return the id of the task. The submitted task should look like this:'
					+ '{"taskId": "-1","title": "Some title","text": "optional description"}'
		}, {
			'title' : 'POST: /ajax/tasks/:id/delete',
			'text' : 'Delete a task by id'
		} ];
>>>>>>> 0ef6b1cf20b8748fb22e131e3e5ee65ad223b5e8

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

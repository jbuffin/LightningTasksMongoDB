var emptyItem = {
	'title' : '',
	'text' : 'nothing selected'
};

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

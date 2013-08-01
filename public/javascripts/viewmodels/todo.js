var emptyItem = {
	'title' : '',
	'text' : 'nothing selected'
};
var server;

function TodoListViewModel() {
	var self = this;
	self.myTodos = ko.observableArray([]);
	self.currentItem = ko.observable(emptyItem);
	self.errorsDetected = ko.observable(false);

	self.getAnItem = function(theItem) {
		self.currentItem(theItem);
	}

	self.removeItem = function(theItem) {
		server.remove(theItem.taskId, function(data) {
			self.myTodos.remove(theItem);
			self.currentItem(emptyItem);
		});
	}

	self.submitNew = function() {
		var newTask = {
			"taskId": "-1",
			"title": $('#newTitle').val(),
			"text": $('#newText').val()
		};
		if (newTask.title === "") {
			self.errorsDetected(true);
		} else {
			server.put(newTask, function(data) {
				newTask.taskId = data;
				self.myTodos.push(newTask);
				self.errorsDetected(false);
				$('#newText').val("");
				$('#newTitle').val("");
			});
		}
	}

	self.init = function() {
		server = new TasksFromServer();
		server.getAll(function(data) {
			self.myTodos(data);
		});
	}
	self.init();
}
$(function() {
	if (typeof ko !== "undefined") {
		ko.applyBindings(new TodoListViewModel());
	}
});

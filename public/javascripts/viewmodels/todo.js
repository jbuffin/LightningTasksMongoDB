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
		server.remove(theItem._id, function(data) {
			self.myTodos.remove(theItem);
			self.currentItem(emptyItem);
		});
	}

	self.submitNew = function() {
		var newTask = {
			"title" : $('#newTitle').val(),
			"text" : $('#newText').val()
		};
		if (newTask.title === "") {
			self.errorsDetected(true);
		} else {
			server.put(newTask, function(data) {
				newTask._id = data.id;
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
var todo;
$(function() {
	todo = new TodoListViewModel();
	if (ko) {
		ko.applyBindings(todo);
	}
});

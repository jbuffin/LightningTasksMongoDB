function TasksFromServer() {
	var self = this;

	self.getAll = function(callback) {
		jsRoutes.controllers.Tasks.getAll().ajax({
			success : callback
		});
	}

	self.put = function(jsonTask, callback) {
		jsRoutes.controllers.Tasks.newTask().ajax({
			success : callback,
			contentType : 'text/json',
			data : JSON.stringify(jsonTask)
		});
	}

	self.remove = function(taskId, callback) {
		jsRoutes.controllers.Tasks.remove(taskId).ajax({
			success : callback,
			error : function(e) {
				console.error(JSON.stringify(e));
			}
		});
	}
}
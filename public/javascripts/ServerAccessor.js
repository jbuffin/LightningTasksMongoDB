function ServerAccessor(url) {
	var self = this;
	var where = url;
	console.log("the url is: " + where);

	self.get = function(what, successCallBack) {
		console.log("get from " + where + what);
		$.getJSON(where + what, successCallBack);
	}

	self.put = function(what, stuff, successCallBack) {
		$.ajax({
			type : "POST",
			dataType : "json",
			contentType : "application/json",
			url : where + what,
			data : JSON.stringify(stuff),
			success : successCallBack
		});
	}
	
	self.remove = function(id, successCallBack) {
		$.ajax({
			type : "POST",
			dataType : "json",
			url : where + "/ajax/tasks/"+id+"/delete",
			success : successCallBack
		});
	}
}

/*
 * Working to convert this class over to the jsRoutes version
 * given by the Play framework. Then, the ServerAccessor class
 * will be deprecated.
 */
function TasksFromServer() {
	var tasksServer = new ServerAccessor("");
	var self = this;

	self.getAll = function(callback) {
		jsRoutes.controllers.Tasks.getAll().ajax({success: callback});//tasksServer.get("/ajax/tasks", callback);
	}

	self.put = function(jsonTask, callback) {
		console.log("getting ready to send a task to the server: "
				+ JSON.stringify(jsonTask));
		tasksServer.put("/ajax/tasks/new", jsonTask, callback);
		//jsRoutes.controllers.Tasks.newTask(JSON.stringify(jsonTask)).ajax({success: callback});
	}
	
	self.remove = function(taskId, callback) {
		console.log("getting ready to delete "+taskId);
		jsRoutes.controllers.Tasks.remove(taskId).ajax({success: callback});
		//tasksServer.remove(taskId, callback)
	}
}
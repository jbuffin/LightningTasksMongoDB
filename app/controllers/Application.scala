package controllers

import play.api._
import play.api.mvc._


object Application extends Controller {

	def tasks = Action {
		Ok(views.html.index())
	}

	def javascriptRoutes = Action { implicit request =>
		import routes.javascript._
		Ok(
			Routes.javascriptRouter("jsRoutes")(
				Tasks.getAll,
				Tasks.newTask,
				Tasks.remove
			)
		).as("text/javascript")
	}



}
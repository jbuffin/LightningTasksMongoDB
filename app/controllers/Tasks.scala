package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.json.Json
import models.Task
import play.api.libs.functional.syntax._

object Tasks extends Controller {

	def getAll = Action {
		Ok(Json.toJson(Task.getAll))
	}

	def getById(taskId: Long) = Action {
		try {
			Ok(Json.toJson(Task.getById(taskId).get))
		} catch {
			case nse: NoSuchElementException =>
				Ok("No task")
		}
	}

	implicit val readTaskJson = (
		(__ \ 'taskId).read[String] and
		(__ \ 'title).read[String] and
		(__ \ 'text).read[String]) tupled

	def newTask = Action { request =>
		request.body.asJson.map { json =>
			json.validate[(String, String, String)].map {
				case (taskId, title, text) => Ok(Task.create(Task(title, text)).toString)
			}.recoverTotal {
				e => BadRequest(Json.obj("status" -> "KO", "message" -> JsError.toFlatJson(e)))
			}
		}.getOrElse {
			BadRequest("Expecting Json data")
		}
	}

	def remove(taskId: Long) = Action {
		Task.delete(taskId)
		Ok(Json.toJson("Ok"))
	}

}
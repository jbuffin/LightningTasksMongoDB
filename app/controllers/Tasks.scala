package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import scala.concurrent.Future
import reactivemongo.api._
import play.modules.reactivemongo.MongoController
import play.modules.reactivemongo.json.collection.JSONCollection
import reactivemongo.bson.BSONObjectID

object Tasks extends Controller with MongoController {

	def collection: JSONCollection = db.collection[JSONCollection]("tasks")

	import play.api.data.Form
	import models._
	import models.JsonFormats._

	def newTask = Action(parse.json) { request =>
		request.body.validate[Task].map { task =>
			val objectId = BSONObjectID.generate
			val taskWithId = Json.obj("_id" -> objectId.stringify, "title" -> task.title, "text" -> task.text)
			val futureResult = collection.insert(taskWithId)
			Async {
				futureResult.map(_ => Ok(Json.obj("id" -> objectId.stringify)))
			}
		}.recoverTotal { error =>
			BadRequest(Json.obj("res" -> "KO") ++ Json.obj("error" -> JsError.toFlatJson(error)))
		}
	}

	def getAll = Action {
		Async {
			val cursor: Cursor[JsValue] = collection.find(Json.obj()).cursor[JsValue]
			val futureTaskList: Future[List[JsValue]] = cursor.toList

			futureTaskList.map { tasks =>
				Ok(Json.toJson(tasks))
			}
		}
	}

	def remove(taskId: String) = Action {
		Async {
			val futureResult = collection.remove(Json.obj("_id" -> taskId))
			futureResult.map(_ => Ok)
		}
	}

}


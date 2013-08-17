package models

case class Task(title: String, text: String)

object JsonFormats {
	import play.api.libs.json.Json
	import play.api.data._
	import play.api.data.Forms._

	implicit val taskFormat = Json.format[Task]
}
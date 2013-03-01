package models

import play.api.db._
import play.api.Play.current
import anorm._
import anorm.SqlParser._
import play.api.libs.json._
import play.api.libs.json.Json

case class Task(title: String, text: String, taskId: Long = -1)

object Task {
	val simple = {
		get[String]("tasks.title") ~
			get[String]("tasks.text") ~
			get[Long]("tasks.task_id") map {
				case title ~ text ~ task_id => Task(title, text, task_id)
			}
	}

	implicit val taskWrites = new Writes[Task] {
		def writes(t: Task): JsValue = {
			Json.obj(
				"taskId" -> t.taskId, "title" -> t.title, "text" -> t.text)
		}
	}

	def getAll: Seq[Task] = {
		DB.withConnection { implicit connection =>
			SQL("select title, text, task_id from tasks").as(Task.simple *)
		}
	}
	
	def getById(taskId: Long): Option[Task] = {
		DB.withConnection { implicit connection =>
			SQL("""
					select title, text, task_id from tasks where task_id = {task_id}
				"""
			).on(
				'task_id -> taskId
			).as(Task.simple.singleOpt)
		}
	}

	def create(task: Task): Long = {
		DB.withConnection { implicit connection =>
			SQL(
				"""
				insert into tasks (title, text) values (
					{title}, {text}
				)
				""").on(
					'title -> task.title,
					'text -> task.text).executeInsert()
		} match {
			case Some(long) => long
			case None => -1
		}
	}

	def delete(taskId: Long) = {
		DB.withConnection { implicit connection =>
			SQL(
				"""
	       delete from tasks WHERE task_id = {task_id}
	      """).on(
					'task_id -> taskId).executeUpdate()
		}
	}
}
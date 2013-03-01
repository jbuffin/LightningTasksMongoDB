package controllers

import models._
import play.api._
import play.api.mvc._

object DefaultDataInit {
	
	def insert() = {
		Logger.info("inserting data")
		if (Task.getAll.isEmpty) {
			Seq(
				Task("a task","do something fun"),
				Task("some random act of kindness", "Some other stuff that might be painful")
			).foreach(Task.create)
		}
	}
	
}
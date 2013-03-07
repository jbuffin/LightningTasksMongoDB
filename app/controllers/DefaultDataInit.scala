package controllers

import models._
import play.api._
import play.api.mvc._

object DefaultDataInit {

	def insert() = {
		Logger.info("DefaultDataInit: inserting data")
		if (Task.getAll.isEmpty) {
			Seq(
				Task(LoremIpsum.words(4), LoremIpsum.sentence),
				Task(LoremIpsum.words(2), LoremIpsum.sentence),
				Task(LoremIpsum.words(3), LoremIpsum.sentence),
				Task(LoremIpsum.words(5), LoremIpsum.sentence)
			).foreach(Task.create)
		}
		Logger.info("DefaultDataInit: done")
	}
	
}
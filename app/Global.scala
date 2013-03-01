import play.api.GlobalSettings
import play.api._
import controllers.DefaultDataInit
import play.api.mvc._
import play.api.mvc.Results._

object Global extends GlobalSettings {
	override def onStart(app: Application) {
		Logger.info("Initializing default data...")
		DefaultDataInit.insert()
		Logger.info("...done")
		Logger.info("US Warrior has started")
	}

	override def onBadRequest(request: RequestHeader, error: String) = {
		Logger.error("Bad Request: " + error)
		BadRequest("Bad Request: " + error)
	}
}
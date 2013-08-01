import play.api.Application
import play.api.GlobalSettings
import play.api.Logger
import play.api.mvc.RequestHeader
import play.api.mvc.Results.BadRequest

object Global extends GlobalSettings {
	override def onStart(app: Application) {
		Logger.info("LightningTasks has started")
	}

	override def onBadRequest(request: RequestHeader, error: String) = {
		Logger.error("Bad Request: " + error)
		BadRequest("Bad Request: " + error)
	}
}
import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

import { Logger, LoggingService } from "ionic-logging-service";

@Component({
	templateUrl: "configuration-viewer-modal.html"
})
export class ConfigurationViewerModalComponent {

	constructor(
		private viewController: ViewController,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Configuration.Viewer.Modal.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	private logger: Logger;

	public ionViewDidEnter(): void {
		const methodName = "ionViewDidEnter";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	public onClose(): void {
		const methodName = "onClose";
		this.logger.entry(methodName);

		this.viewController.dismiss();

		this.logger.exit(methodName);
	}
}

import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

import { TranslateService } from "ng2-translate";

import { Logger, LoggingService } from "ionic-logging-service";

import { ConfigurationViewerTranslations } from "./configuration-viewer.translations";

/**
 * Ionic modal containing the ConfigurationViewerComponent.
 */
@Component({
	templateUrl: "configuration-viewer-modal.html"
})
export class ConfigurationViewerModalComponent {

	constructor(
		private viewController: ViewController,
		private translateService: TranslateService,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Configuration.Viewer.Modal.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.ensureTranslations();

		this.logger.exit(methodName);
	}

	// tslint:disable-next-line:completed-docs
	private logger: Logger;

	/**
	 * Eventhandler called by Ionic when the modal is opened.
	 */
	public ionViewDidEnter(): void {
		const methodName = "ionViewDidEnter";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	/**
	 * Eventhandler called when the cancel button is clicked.
	 */
	public onClose(): void {
		const methodName = "onClose";
		this.logger.entry(methodName);

		this.viewController.dismiss();

		this.logger.exit(methodName);
	}

	/**
	 * Helper method which retrieves the translations for the ConfigurationViewerModalComponent.
	 */
	private ensureTranslations(): void {
		const methodName = "ensureTranslations";
		this.logger.entry(methodName);

		const translations = new ConfigurationViewerTranslations();

		for (const language of translations.getLanguages()) {
			this.logger.info(methodName, `providing translations for ${language}`);
			this.translateService.setTranslation(language, translations.getTranslation(language));
		}

		this.logger.exit(methodName);
	}
}

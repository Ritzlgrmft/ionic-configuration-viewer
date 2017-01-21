import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";

import { TranslateService } from "ng2-translate";

import { Logger, LoggingService } from "ionic-logging-service";

import { ConfigurationViewerTranslations } from "./configuration-viewer.translations";

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

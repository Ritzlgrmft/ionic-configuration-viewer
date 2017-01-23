import { Component, Input, OnInit } from "@angular/core";
import { ViewController } from "ionic-angular";

import { Logger, LoggingService } from "ionic-logging-service";

import { ConfigurationViewerTranslation } from "./configuration-viewer-translation.model";

/**
 * Ionic modal containing the ConfigurationViewerComponent.
 */
@Component({
	template:
	"<ion-header>" +
	"<ion-toolbar color=\"primary\">" +
	"<ion-title>{{ getTranslation().title }}</ion-title>" +
	"<ion-buttons start>" +
	"<button ion-button hideWhen=\"android,windows\" (click)=\"onClose()\" >" +
	"{{ getTranslation().buttonCancel }}" +
	"</button>" +
	"<button ion-button icon-only showWhen= \"android,windows\" (click)=\"onClose()\" >" +
	"<ion-icon name=\"md-close\"></ion-icon>" +
	"</button>" +
	"</ion-buttons>" +
	"</ion-toolbar>" +
	"</ion-header>" +
	"<ion-content>" +
	"<ionic-configuration-viewer></ionic-configuration-viewer>" +
	"</ion-content>"
})
export class ConfigurationViewerModalComponent implements OnInit {

	/**
	 * Language to be used for the modal.
	 * Currently supported: en, de
	 */
	@Input() public language: string;

	/**
	 * Translation to be used for the modal.
	 * If specified, the language is ignored.
	 */
	@Input() public translation: ConfigurationViewerTranslation;

	// tslint:disable-next-line:completed-docs
	private logger: Logger;

	// tslint:disable-next-line:completed-docs	
	public translations: { [language: string]: ConfigurationViewerTranslation; };

	constructor(
		private viewController: ViewController,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Configuration.Viewer.Modal.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	/**
	 * Initializes the ConfigurationViewerModalComponent.
	 * It configures the supported translations.
	 */
	public ngOnInit(): void {
		// prepare translations
		this.translations = {};
		// tslint:disable-next-line:no-string-literal
		this.translations["en"] = {
			"title": "Configuration",
			"buttonCancel": "Cancel"
		};
		// tslint:disable-next-line:no-string-literal
		this.translations["de"] = {
			"title": "Konfiguration",
			"buttonCancel": "Abbrechen"
		};
	}

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
	 * Helper method returning the current translation:
	 * - the property translation if defined
	 * - the translation according property language if valid
	 * - English translation, otherwise
	 */
	public getTranslation(): ConfigurationViewerTranslation {
		if (typeof this.translation !== "undefined") {
			return this.translation;
		} else if (typeof this.language !== "undefined" && typeof this.translations[this.language] === "object") {
			return this.translations[this.language];
		} else {
			// tslint:disable-next-line:no-string-literal
			return this.translations["en"];
		}
	}
}

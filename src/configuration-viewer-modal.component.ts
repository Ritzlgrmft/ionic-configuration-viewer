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
	"<ion-title>{{ translations[language].title }}</ion-title>" +
	"<ion-buttons start>" +
	"<button ion-button hideWhen=\"android,windows\" (click)=\"onClose()\" >" +
	"{{ translations[language].buttonCancel }}" +
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

	// tslint:disable-next-line:completed-docs
	private logger: Logger;

	// tslint:disable-next-line:completed-docs	
	public translations: { [language: string]: ConfigurationViewerTranslation; };

	constructor(
		private viewController: ViewController,
		// private translateService: TranslateService,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Configuration.Viewer.Modal.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		// this.ensureTranslations();

		this.logger.exit(methodName);
	}

	/**
	 * Initializes the ConfigurationViewerModalComponent.
	 * It configures the supported translations.
	 */
	public ngOnInit(): void {
		const methodName = "ngOnInit";

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

		// set default language
		if (typeof this.language === "undefined") {
			this.logger.debug(methodName, "no language defined, using en");
			this.language = "en";
		} else if (typeof this.translations[this.language] !== "object") {
			this.logger.debug(methodName, `no translations for language ${this.language}, using en`);
			this.language = "en";
		}
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

	// /**
	//  * Helper method which retrieves the translations for the ConfigurationViewerModalComponent.
	//  */
	// public ensureTranslations(): Promise<void> {
	// 	const methodName = "ensureTranslations";
	// 	this.logger.entry(methodName);

	// 	const translations = new ConfigurationViewerTranslations();

	// 	const promises: Promise<void>[] = [];
	// 	for (const language of translations.getLanguages()) {
	// 		// this.logger.info(methodName, `providing translations for ${language}`);

	// 		// promises.push(
	// 		const o = this.translateService.getTranslation(language);
	// 		o.subscribe(translation => {
	// 			this.updateTranslations(undefined, translation, translations.getTranslation(language));
	// 		});
	// 		// let p = o.toPromise();
	// 		// p = p
	// 		// 	.then(translation => {
	// 		// 		this.updateTranslations(undefined, translation, translations.getTranslation(language));
	// 		// 	});
	// 		// promises.push(p);
	// 		// );
	// 		// this.translateService.setTranslation(language, translations.getTranslation(language), true);
	// 	}

	// 	const promise = Promise.all(promises)
	// 		.then(() => {
	// 			if (this.translateService.currentLang === undefined) {
	// 				this.logger.info(methodName, "setting language to 'en'");
	// 				this.translateService.use("en");
	// 			}
	// 		});

	// 	this.logger.exit(methodName);
	// 	return promise;
	// }

	// private updateTranslations(parentKey: string, currentTranslations: { [key: string]: any }, newTranslations: { [key: string]: any }): void {
	// 	const methodName = "updateTranslations";

	// 	// tslint:disable-next-line:forin
	// 	for (const key in newTranslations) {
	// 		const currentKey = typeof parentKey === "undefined" ? key : parentKey + "." + key;
	// 		if (typeof currentTranslations[key] === "undefined") {
	// 			currentTranslations[key] = newTranslations[key];
	// 		} else if (typeof currentTranslations[key] === "object" && typeof newTranslations[key] === "object") {
	// 			this.updateTranslations(currentKey, currentTranslations[key], newTranslations[key]);
	// 		} else {
	// 			this.logger.debug(methodName, `${currentKey} gets not updated`);
	// 		}
	// 	}
	// }
}

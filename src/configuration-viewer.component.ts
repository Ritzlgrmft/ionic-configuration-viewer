import { Component, OnInit } from "@angular/core";

import { ConfigurationService } from "ionic-configuration-service";
import { Logger, LoggingService } from "ionic-logging-service";

import { ConfigurationSection } from "./configuration-section.model";

/**
 * Component for displaying the current configuration.
 * The component can be embedded in any web page using the directive ionic-configuration-viewer.
 */
@Component({
	selector: "ionic-configuration-viewer",
	template:
	"<ion-list *ngFor=\"let section of configValues\">" +
	"<ion-list-header>{{section.key}}</ion-list-header>" +
	"<ion-item *ngFor=\"let entry of section.entries\">" +
	"<div item-left>{{entry.key}}</div>" +
	"<div item-right>{{entry.value}}</div>" +
	"</ion-item>" +
	"</ion-list>"
})
export class ConfigurationViewerComponent implements OnInit {

	// tslint:disable-next-line:completed-docs
	public configValues: ConfigurationSection[];

	// tslint:disable-next-line:completed-docs
	private logger: Logger;

	constructor(
		private configurationService: ConfigurationService,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Configuration.Viewer.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.configValues = [];

		this.logger.exit(methodName, this.configValues);
	}

	/**
	 * Initializes the ConfigurationViewerComponent.
	 * It reads the current configuration from ConfigurationService
	 * and prepares them for displaying in the component.
	 */
	public ngOnInit(): void {
		this.configValues = [];
		for (const key of this.configurationService.getKeys()) {
			const section: ConfigurationSection = { key: key, entries: [] };
			const value = this.configurationService.getValue(key);
			if (typeof value === "object") {
				// tslint:disable-next-line:forin
				for (const entry in value) {
					section.entries.push({ key: entry, value: this.convertValue((<any>value)[entry]) });
				}
			} else {
				section.entries.push({ value: this.convertValue(value) });
			}
			this.configValues.push(section);
		}
	}

	/**
	 * Converts a configuration value into a string for displaying it in ConfigurationViewerComponent.
	 * @param value value which shall be converted
	 * @returns converted value
	 */
	public convertValue(value: any): string {
		return JSON.stringify(value, undefined, 1);
	}
}

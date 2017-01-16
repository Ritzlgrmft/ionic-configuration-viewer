import { Component, OnInit } from "@angular/core";

import { ConfigurationService } from "ionic-configuration-service";
import { Logger, LoggingService } from "ionic-logging-service";

import { ConfigurationSection } from "./configuration-section.model";

@Component({
	selector: "ionic-configuration-viewer",
	templateUrl: "configuration-viewer.html"
})
export class ConfigurationViewerComponent implements OnInit {

	public configValues: ConfigurationSection[];

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

	public convertValue(value: any): string {
		return JSON.stringify(value, undefined, 1);
	}
}

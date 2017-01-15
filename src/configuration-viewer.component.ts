import { Component } from "@angular/core";

import { ConfigurationService } from "ionic-configuration-service";
import { Logger, LoggingService } from "ionic-logging-service";

import { ConfigurationSection } from "./configuration-section.model";

@Component({
	selector: "ionic-configuration-viewer",
	templateUrl: "configuration-viewer.html"
})
export class ConfigurationViewerComponent {

	constructor(
		configurationService: ConfigurationService,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Configuration.Viewer.Component");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.configValues = [];
		for (const key of configurationService.getKeys()) {
			const section: ConfigurationSection = { key: key, entries: [] };
			const value = configurationService.getValue(key);
			if (typeof value === "object") {
				for (const entry in value) {
					if (value.hasOwnProperty(entry)) {
						section.entries.push({ key: entry, value: JSON.stringify((<any>value)[entry], undefined, " ") });
					}
				}
			} else {
				section.entries.push({ value: JSON.stringify(value) });
			}
			this.configValues.push(section);
		}

		this.logger.exit(methodName, this.configValues);
	}

	public configValues: ConfigurationSection[];

	private logger: Logger;
}

import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";

import { ConfigurationViewerModalComponent } from "./configuration-viewer-modal.component";
import { ConfigurationViewerModalManager } from "./configuration-viewer-modal.manager";
import { ConfigurationViewerComponent } from "./configuration-viewer.component";

/**
 * ConfigurationViewerModule is an NgModule that provides a viewer component showing the configuration data
 * currently loaded in the ConfigurationService.
 *
 * The module is meant for use at development and test, not for production.
 *
 * The module contains mainly
 * - ConfigurationViewerComponent: directive showing the data, which can placed anywhere in your app
 * - ConfigurationViewerModalManager: provides method to open a modal containing the component
 */
@NgModule({
	declarations: [
		ConfigurationViewerModalComponent,
		ConfigurationViewerComponent
	],
	imports: [
		IonicModule
	],
	exports: [
		ConfigurationViewerComponent
	],
	entryComponents: [
		ConfigurationViewerModalComponent
	],
	providers: [
		ConfigurationViewerModalManager
	]
})
export class ConfigurationViewerModule { }
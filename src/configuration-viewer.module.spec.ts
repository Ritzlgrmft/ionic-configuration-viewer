// tslint:disable:no-magic-numbers
import { async, TestBed } from "@angular/core/testing";
import { IonicModule, ViewController } from "ionic-angular";
import { TranslateModule } from "ng2-translate";

import { ConfigurationService } from "ionic-configuration-service";
import { LoggingService } from "ionic-logging-service";

import { ConfigurationViewerComponent } from "./configuration-viewer.component";
import { ConfigurationViewerModalComponent } from "./configuration-viewer-modal.component";
import { ConfigurationViewerModule } from "./configuration-viewer.module";

describe("ConfigurationViewerModule", () => {

	const configurationServiceStub = jasmine.createSpyObj("configurationServiceStub", ["getKeys", "getValue"]);
	configurationServiceStub.getKeys.and.returnValue([]);

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit", "info"]);

	const loggingServiceStub = jasmine.createSpyObj("loggingServiceStub", ["getLogger"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);

	const viewControllerStub = new ViewController();

	beforeEach(async(() => {
		TestBed
			.configureTestingModule({
				imports: [
					IonicModule.forRoot(undefined),
					TranslateModule.forRoot(),
					ConfigurationViewerModule
				],
				providers: [
					{ provide: ConfigurationService, useValue: configurationServiceStub },
					{ provide: LoggingService, useValue: loggingServiceStub },
					{ provide: ViewController, useValue: viewControllerStub }
				]
			})
			.compileComponents();
	}));

	describe("ConfigurationViewerModalComponent", () => {

		it("component can be created", () => {

			TestBed.createComponent(ConfigurationViewerModalComponent);
		});
	});

	describe("ConfigurationViewerComponent", () => {

		it("component can be created", () => {

			TestBed.createComponent(ConfigurationViewerComponent);
		});
	});
});

// tslint:disable:no-magic-numbers
import { async, TestBed } from "@angular/core/testing";
import { IonicModule, NavParams, ViewController } from "ionic-angular";

import { ConfigurationService } from "ionic-configuration-service";
import { LoggingService } from "ionic-logging-service";

import { ConfigurationViewerModalComponent } from "./configuration-viewer-modal.component";
import { ConfigurationViewerComponent } from "./configuration-viewer.component";
import { ConfigurationViewerModule } from "./configuration-viewer.module";

describe("ConfigurationViewerModule", () => {

	const configurationServiceStub = jasmine.createSpyObj("configurationServiceStub", ["getKeys", "getValue"]);
	configurationServiceStub.getKeys.and.returnValue([]);

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit", "info"]);

	const loggingServiceStub = jasmine.createSpyObj("loggingServiceStub", ["getLogger"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);

	const viewControllerStub = new ViewController();

	const navParamsStub = jasmine.createSpyObj("navParams", ["get"]);
	navParamsStub.get.and.returnValue(undefined);

	beforeEach(async(() => {
		TestBed
			.configureTestingModule({
				imports: [
					IonicModule.forRoot(undefined),
					ConfigurationViewerModule,
				],
				providers: [
					{ provide: ConfigurationService, useValue: configurationServiceStub },
					{ provide: LoggingService, useValue: loggingServiceStub },
					{ provide: ViewController, useValue: viewControllerStub },
					{ provide: NavParams, useValue: navParamsStub },
				],
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

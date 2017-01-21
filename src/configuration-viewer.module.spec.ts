// tslint:disable:no-magic-numbers
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { IonicModule, ViewController } from "ionic-angular";
import { TranslateLoader, TranslateModule, TranslateService } from "ng2-translate";
import { Observable } from "rxjs/Observable";

import { ConfigurationService } from "ionic-configuration-service";
import { LoggingService } from "ionic-logging-service";

import { ConfigurationViewerComponent } from "./configuration-viewer.component";
import { ConfigurationViewerModalComponent } from "./configuration-viewer-modal.component";
import { ConfigurationViewerModule } from "./configuration-viewer.module";

describe("ConfigurationViewerModule", () => {

	const configurationServiceStub = jasmine.createSpyObj("configurationServiceStub", ["getKeys", "getValue"]);
	configurationServiceStub.getKeys.and.returnValue([]);

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit"]);

	const loggingServiceStub = jasmine.createSpyObj("loggingServiceStub", ["getLogger"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);

	const viewControllerStub = new ViewController();

	class TranslateDummyLoader implements TranslateLoader {
		public getTranslation(lang: string): Observable<any> {
			return Observable.of({ notLoaded: lang });
		}
	}

	beforeEach(async(() => {
		TestBed
			.configureTestingModule({
				imports: [
					IonicModule.forRoot(undefined),
					TranslateModule.forRoot({
						provide: TranslateLoader,
						useFactory: () => new TranslateDummyLoader()
					}),
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

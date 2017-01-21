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

describe("ConfigurationViewerModalComponent", () => {

	let component: ConfigurationViewerModalComponent;
	let fixture: ComponentFixture<ConfigurationViewerModalComponent>;
	let configurationService: ConfigurationService;
	let loggingService: LoggingService;
	let translateService: TranslateService;

	const configurationServiceStub = jasmine.createSpyObj("configurationServiceStub", ["getKeys", "getValue"]);
	configurationServiceStub.getKeys.and.returnValue([]);

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit", "info"]);

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
				declarations: [
					ConfigurationViewerComponent,
					ConfigurationViewerModalComponent
				],
				imports: [
					IonicModule.forRoot(undefined),
					TranslateModule.forRoot({
						provide: TranslateLoader,
						useFactory: () => new TranslateDummyLoader()
					})
				],
				providers: [
					{ provide: ConfigurationService, useValue: configurationServiceStub },
					{ provide: LoggingService, useValue: loggingServiceStub },
					{ provide: ViewController, useValue: viewControllerStub }
				]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfigurationViewerModalComponent);

		component = fixture.componentInstance;

		configurationService = TestBed.get(ConfigurationService);
		loggingService = TestBed.get(LoggingService);

		translateService = TestBed.get(TranslateService);

	});

	describe("constructor", () => {

		it("gets correct named logger", () => {

			expect(loggingServiceStub.getLogger).toHaveBeenCalledWith("Ionic.Configuration.Viewer.Modal.Component");
		});

		it("logs entry and exit", () => {

			expect(loggerStub.entry).toHaveBeenCalledWith("ctor");
			expect(loggerStub.exit).toHaveBeenCalledWith("ctor");
		});
	});

	describe("ionViewDidEnter", () => {

		it("logs entry and exit", () => {

			component.ionViewDidEnter();

			expect(loggerStub.entry).toHaveBeenCalledWith("ionViewDidEnter");
			expect(loggerStub.exit).toHaveBeenCalledWith("ionViewDidEnter");
		});
	});

	describe("onClose(): void", () => {

		it("calls viewController.dismiss()", () => {

			spyOn(viewControllerStub, "dismiss");

			component.onClose();

			expect(viewControllerStub.dismiss).toHaveBeenCalled();
		});
	});

	describe("ng2-translate", () => {

		it("known language: title is translated", () => {
			translateService.use("en");
			fixture.detectChanges();

			const ionTitle = fixture.debugElement.query(By.css("ion-title"));
			expect(ionTitle.nativeElement.textContent).toBe("Configuration");
		});

		it("unknown language: title is resource id", () => {
			translateService.use("xx");
			fixture.detectChanges();

			const ionTitle = fixture.debugElement.query(By.css("ion-title"));
			expect(ionTitle.nativeElement.textContent).toBe("ionic.configuration.viewer.title");
		});
	});
});

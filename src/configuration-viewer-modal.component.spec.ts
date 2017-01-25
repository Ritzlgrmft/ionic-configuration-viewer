// tslint:disable:no-magic-numbers
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule, NavParams, ViewController } from "ionic-angular";

import { ConfigurationService } from "ionic-configuration-service";
import { LoggingService } from "ionic-logging-service";

import { ConfigurationViewerComponent } from "./configuration-viewer.component";
import { ConfigurationViewerModalComponent } from "./configuration-viewer-modal.component";

describe("ConfigurationViewerModalComponent", () => {

	let component: ConfigurationViewerModalComponent;
	let fixture: ComponentFixture<ConfigurationViewerModalComponent>;

	const configurationServiceStub = jasmine.createSpyObj("configurationServiceStub", ["getKeys", "getValue"]);
	configurationServiceStub.getKeys.and.returnValue([]);

	const loggerStub = jasmine.createSpyObj("logger", ["debug", "entry", "exit", "info"]);

	const loggingServiceStub = jasmine.createSpyObj("loggingServiceStub", ["getLogger"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);

	const viewControllerStub = new ViewController();

	const navParamsStub = jasmine.createSpyObj("navParams", ["get"]);
	navParamsStub.get.and.returnValue(undefined);

	beforeEach(async(() => {
		TestBed
			.configureTestingModule({
				declarations: [
					ConfigurationViewerComponent,
					ConfigurationViewerModalComponent
				],
				imports: [
					IonicModule.forRoot(undefined)
				],
				providers: [
					{ provide: ConfigurationService, useValue: configurationServiceStub },
					{ provide: LoggingService, useValue: loggingServiceStub },
					{ provide: ViewController, useValue: viewControllerStub },
					{ provide: NavParams, useValue: navParamsStub }
				]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfigurationViewerModalComponent);
		component = fixture.componentInstance;
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

	describe("getTranslation(): ConfigurationViewerTranslation", () => {

		it("known language, no translation: title is translated", () => {

			component.ngOnInit();
			component.language = "de";
			component.translation = undefined;

			const translation = component.getTranslation();

			expect(translation.title).toBe("Konfiguration");
		});

		it("unknown language, no translation: english translation is used", () => {

			component.ngOnInit();
			component.language = "fr";
			component.translation = undefined;

			const translation = component.getTranslation();

			expect(translation.title).toBe("Configuration");
		});

		it("no language, no translation: english translation is used", () => {

			component.ngOnInit();
			component.language = undefined;
			component.translation = undefined;

			const translation = component.getTranslation();

			expect(translation.title).toBe("Configuration");
		});

		it("no language, but translation: translation is used", () => {

			component.ngOnInit();
			component.language = undefined;
			component.translation = { title: "ttt", buttonCancel: "bc" };

			const translation = component.getTranslation();

			expect(translation.title).toBe("ttt");
		});


		it("language and translation: translation is used", () => {

			component.ngOnInit();
			component.language = "en";
			component.translation = { title: "ttt", buttonCancel: "bc" };

			const translation = component.getTranslation();

			expect(translation.title).toBe("ttt");
		});
	});
});

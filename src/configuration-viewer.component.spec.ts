// tslint:disable:no-magic-numbers
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { IonicModule } from "ionic-angular";

import { ConfigurationService } from "ionic-configuration-service";
import { LoggingService } from "ionic-logging-service";

import { ConfigurationViewerComponent } from "./configuration-viewer.component";

describe("ConfigurationViewerComponent", () => {

	let component: ConfigurationViewerComponent;
	let fixture: ComponentFixture<ConfigurationViewerComponent>;
	let configurationService: ConfigurationService;
	let loggingService: LoggingService;

	const configurationServiceStub = jasmine.createSpyObj("configurationServiceStub", ["getKeys", "getValue"]);
	configurationServiceStub.getKeys.and.returnValue([]);

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit"]);

	const loggingServiceStub = jasmine.createSpyObj("loggingServiceStub", ["getLogger"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);

	beforeEach(async(() => {
		TestBed
			.configureTestingModule({
				declarations: [
					ConfigurationViewerComponent
				],
				imports: [
					IonicModule.forRoot(undefined)
				],
				providers: [
					{ provide: ConfigurationService, useValue: configurationServiceStub },
					{ provide: LoggingService, useValue: loggingServiceStub }
				]
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConfigurationViewerComponent);

		component = fixture.componentInstance;

		configurationService = TestBed.get(ConfigurationService);
		loggingService = TestBed.get(LoggingService);
	});

	describe("constructor", () => {

		it("gets correct named logger", () => {

			expect(loggingServiceStub.getLogger).toHaveBeenCalledWith("Ionic.Configuration.Viewer.Component");
		});

		it("logs entry and exit", () => {

			expect(loggerStub.entry).toHaveBeenCalledWith("ctor");
			expect(loggerStub.exit).toHaveBeenCalledWith("ctor", []);
		});
	});

	describe("ngOnInit(): void", () => {

		it("generated html is empty if configuration is empty", () => {

			expect(fixture.debugElement.children.length).toBe(0);
		});

		it("general structure", () => {

			configurationServiceStub.getKeys.and.returnValue(["myKey"]);
			configurationServiceStub.getValue.and.returnValue("myValue");

			component.ngOnInit();
			fixture.detectChanges();

			const ionList = fixture.debugElement.query(By.css("ion-list"));
			expect(ionList).not.toBeNull();

			const ionListHeader = ionList.query(By.css("ion-list-header"));
			expect(ionListHeader).not.toBeNull();
			expect(ionListHeader.nativeElement.textContent).toBe("myKey");

			const ionItem = ionList.query(By.css("ion-item"));
			expect(ionItem).not.toBeNull();

			const itemLeft = ionItem.query(By.css("div[item-left]"));
			expect(itemLeft.nativeElement.textContent).toBe("");

			const itemRight = ionItem.query(By.css("div[item-right]"));
			expect(itemRight.nativeElement.textContent).toBe("\"myValue\"");
		});

		it("key with string value", () => {

			configurationServiceStub.getKeys.and.returnValue(["myKey"]);
			configurationServiceStub.getValue.and.returnValue("myValue");

			component.ngOnInit();
			fixture.detectChanges();

			const itemLeft = fixture.debugElement.query(By.css("div[item-left]"));
			expect(itemLeft.nativeElement.textContent).toBe("");
			const itemRight = fixture.debugElement.query(By.css("div[item-right]"));
			expect(itemRight.nativeElement.textContent).toBe("\"myValue\"");
		});

		it("key with complex value", () => {

			configurationServiceStub.getKeys.and.returnValue(["myKey"]);
			configurationServiceStub.getValue.and.returnValue({ prop1: "x", prop2: 2 });

			component.ngOnInit();
			fixture.detectChanges();

			const ionItems = fixture.debugElement.queryAll(By.css("ion-item"));
			expect(ionItems.length).toBe(2);
		});
	});

	describe("convertValue(value: any): string", () => {

		it("string", () => {

			const convertedValue = component.convertValue("text");
			expect(convertedValue).toBe("\"text\"");
		});

		it("number", () => {

			const convertedValue = component.convertValue(42.1);
			expect(convertedValue).toBe("42.1");
		});

		it("boolean", () => {

			const convertedValue = component.convertValue(true);
			expect(convertedValue).toBe("true");
		});

		it("Date", () => {

			const convertedValue = component.convertValue(new Date(Date.UTC(2017, 0, 1, 18, 37, 42, 123)));
			expect(convertedValue).toBe("\"2017-01-01T18:37:42.123Z\"");
		});

		it("object", () => {

			const convertedValue = component.convertValue({ prop1: "text", prop2: 42 });
			expect(convertedValue).toBe("{\n \"prop1\": \"text\",\n \"prop2\": 42\n}");
		});
	});
});

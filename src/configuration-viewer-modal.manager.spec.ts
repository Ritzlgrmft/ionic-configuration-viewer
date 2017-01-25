// tslint:disable:no-magic-numbers
import { ConfigurationViewerModalManager } from "./configuration-viewer-modal.manager";

describe("ConfigurationViewerModalManager", () => {

	const loggerStub = jasmine.createSpyObj("logger", ["entry", "exit"]);

	const loggingServiceStub = jasmine.createSpyObj("loggingService", ["getLogger"]);
	loggingServiceStub.getLogger.and.returnValue(loggerStub);

	class ModalStub {
		private onDidDismissCallback: Function;
		public present(): Promise<void> {
			return Promise.resolve();
		}
		public onDidDismiss(callback: Function): void {
			this.onDidDismissCallback = callback;
		}
		public dismiss(): void {
			this.onDidDismissCallback();
		}
	}
	const modalStub = new ModalStub();

	const modalControllerStub = jasmine.createSpyObj("modalController", ["create"]);
	modalControllerStub.create.and.returnValue(modalStub);

	describe("constructor", () => {

		it("gets correct named logger", () => {

			new ConfigurationViewerModalManager(modalControllerStub, loggingServiceStub);

			expect(loggingServiceStub.getLogger).toHaveBeenCalledWith("Ionic.Configuration.Viewer.Modal.Manager");
		});

		it("logs entry and exit", () => {

			new ConfigurationViewerModalManager(modalControllerStub, loggingServiceStub);

			expect(loggerStub.entry).toHaveBeenCalledWith("ctor");
			expect(loggerStub.exit).toHaveBeenCalledWith("ctor");
		});
	});

	describe("openModal(): Promise<void>", () => {

		it("presents modal", done => {

			const manager = new ConfigurationViewerModalManager(modalControllerStub, loggingServiceStub);
			spyOn(modalStub, "present").and.callThrough();

			manager.openModal()
				.then(() => {
					expect(modalStub.present).toHaveBeenCalled();
					done();
				});
		});

		it("language is passed", done => {

			const manager = new ConfigurationViewerModalManager(modalControllerStub, loggingServiceStub);

			manager.openModal("xx")
				.then(() => {
					expect(modalControllerStub.create.calls.mostRecent().args[1])
						.toEqual({
							language: "xx",
							translation: undefined
						});
					done();
				});
		});

		it("translation is passed", done => {

			const manager = new ConfigurationViewerModalManager(modalControllerStub, loggingServiceStub);

			manager.openModal(undefined, { title: "ttt", buttonCancel: "bc" })
				.then(() => {
					expect(modalControllerStub.create.calls.mostRecent().args[1])
						.toEqual({
							language: undefined,
							translation: { title: "ttt", buttonCancel: "bc" }
						});
					done();
				});
		});

		it("language and translation is passed", done => {

			const manager = new ConfigurationViewerModalManager(modalControllerStub, loggingServiceStub);

			manager.openModal("xx", { title: "ttt", buttonCancel: "bc" })
				.then(() => {
					expect(modalControllerStub.create.calls.mostRecent().args[1])
						.toEqual({
							language: "xx",
							translation: { title: "ttt", buttonCancel: "bc" }
						});
					done();
				});
		});
	});

	describe("modalClosed: EventEmitter<void>()", () => {

		it("event is triggered when modal gets closed", (done) => {

			const manager = new ConfigurationViewerModalManager(modalControllerStub, loggingServiceStub);
			manager.modalClosed.subscribe(() => {
				done();
			});

			manager.openModal()
				.then(() => {
					modalStub.dismiss();
				});
		});
	});
});

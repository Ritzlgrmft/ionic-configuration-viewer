import { EventEmitter, Injectable } from "@angular/core";
import { ModalController } from "ionic-angular";

import { ConfigurationViewerModalComponent } from "./configuration-viewer-modal.component";

import { Logger, LoggingService } from "ionic-logging-service";

@Injectable()
export class ConfigurationViewerModalManager {

	constructor(
		private modalController: ModalController,
		loggingService: LoggingService) {

		this.logger = loggingService.getLogger("Ionic.Configuration.Viewer.Modal.Manager");
		const methodName = "ctor";
		this.logger.entry(methodName);

		this.logger.exit(methodName);
	}

	public modalClosed = new EventEmitter<void>();

	private logger: Logger;

	public openModal(): Promise<void> {
		const methodName = "openModal";
		this.logger.entry(methodName);

		const modal = this.modalController.create(ConfigurationViewerModalComponent);
		modal.onDidDismiss(() => {
			this.onModalClosed();
		});
		const promise = modal.present();

		this.logger.exit(methodName);
		return promise;
	}

	private onModalClosed(): void {
		const methodName = "onModalClosed";
		this.logger.entry(methodName);

		this.modalClosed.emit();

		this.logger.exit(methodName);
	}
}
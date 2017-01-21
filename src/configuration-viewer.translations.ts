export class ConfigurationViewerTranslations {

	private translations = [
		{
			"language": "en",
			"translation": {
				"ionic": {
					"configuration": {
						"viewer": {
							"title": "Configuration",
							"buttonCancel": "Cancel"
						}
					}
				}
			}
		},
		{
			"language": "de",
			"translation": {
				"ionic": {
					"configuration": {
						"viewer": {
							"title": "Konfiguration",
							"buttonCancel": "Abbrechen"
						}
					}
				}
			}
		}
	];

	public getLanguages(): string[] {

		const languages: string[] = [];

		for (const t of this.translations) {
			languages.push(t.language);
		}

		return languages;
	}

	public getTranslation(language: string): Object {

		for (const t of this.translations) {
			if (t.language === language) {
				return t.translation;
			}
		}

		return undefined;
	}
}
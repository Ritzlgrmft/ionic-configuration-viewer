/**
 * Helper class providing translations for ConfigurationViewerModalComponent.
 */
export class ConfigurationViewerTranslations {

	// tslint:disable-next-line:completed-docs
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

	/**
	 * Get all languages for which translations exist.
	 * For the language, the two-letter [ISO_639-1](https://en.wikipedia.org/wiki/ISO_639-1) is used.
	 * @returns array of languages
	 */
	public getLanguages(): string[] {

		const languages: string[] = [];

		for (const t of this.translations) {
			languages.push(t.language);
		}

		return languages;
	}

	/**
	 * Get the tranlation for the given language.
	 * @param language language for which the translation is requested
	 * @returns translation
	 */
	public getTranslation(language: string): Object {

		for (const t of this.translations) {
			if (t.language === language) {
				return t.translation;
			}
		}

		return undefined;
	}
}
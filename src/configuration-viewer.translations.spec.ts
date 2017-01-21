import { ConfigurationViewerTranslations } from "./configuration-viewer.translations";

describe("ConfigurationViewerTranslations", () => {

	describe("getLanguages(): string[]", () => {

		it("returns defined languages", () => {

			const translations = new ConfigurationViewerTranslations();

			const languages = translations.getLanguages();

			expect(languages).toEqual(["en", "de"]);
		});
	});

	describe("getTranslation(language: string): Object", () => {

		it("known language: translations are returned", () => {

			const translations = new ConfigurationViewerTranslations();

			const t = translations.getTranslation("en");

			expect(t).toBeDefined();
		});

		it("unknown language: undefined is returned", () => {

			const translations = new ConfigurationViewerTranslations();

			const t = translations.getTranslation("xx");

			expect(t).toBeUndefined();
		});
	});
});

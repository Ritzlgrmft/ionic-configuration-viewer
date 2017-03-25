module.exports = function (config) {
	config.set({

		frameworks: ["jasmine", "karma-typescript", "es6-shim"],

		files: [
			{ pattern: "src/**/*.+(ts|html)" }
		],

		exclude: [
			"dist/**/*",
			"src/**/*.ngfactory.ts"
		],

		proxies: {
			"/configuration-viewer.html": "/base/src/configuration-viewer.html",
			"/configuration-viewer-modal.html": "/base/src/configuration-viewer-modal.html"
		},

		preprocessors: {
			"**/*.ts": ["karma-typescript"]
		},

		reporters: ["progress", "karma-typescript"],

		browsers: ["Chrome", "PhantomJS"],

		karmaTypescriptConfig: {
			exclude: ["dist"],
			reports:
			{
				"html": "coverage",
				"lcovonly": {
					"directory": "coverage",
					"filename": "lcovonly/lcov.info"
				},
				"text-summary": ""
			},
			bundlerOptions: {
				transforms: [
					require("karma-typescript-es6-transform")()
				]
			}
		},

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity
	});
}

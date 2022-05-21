// /// <reference types="cypress" />

// const path = require("path");
// const fs = require("fs");

// const downloadDirectory = path.join(__dirname, "..", "downloads");

// const findPDF = (PDFfilename) => {
//   const PDFFileName = `${downloadDirectory}/${PDFfilename}`;
//   const contents = fs.existsSync(PDFFileName);
//   return contents;
// };

// const hasPDF = (PDFfilename, ms) => {
//   const delay = 10;
//   return new Promise((resolve, reject) => {
//     if (ms < 0) {
//       return reject(
//         new Error(`Could not find PDF ${downloadDirectory}/${PDFfilename}`)
//       );
//     }
//     const found = findPDF(PDFfilename);
//     if (found) {
//       return resolve(true);
//     }
//     setTimeout(() => {
//       hasPDF(PDFfilename, ms - delay).then(resolve, reject);
//     }, delay);
//   });
// };

// module.exports = (on, config) => {
//   require("@cypress/code-coverage/task")(on, config);
//   on("before:browser:launch", (browser, options) => {
//     if (browser.family === "chromium") {
//       options.preferences.default["download"] = {
//         default_directory: downloadDirectory,
//       };
//       return options;
//     }
//     if (browser.family === "firefox") {
//       options.preferences["browser.download.dir"] = downloadDirectory;
//       options.preferences["browser.download.folderList"] = 2;
//       options.preferences["browser.helperApps.neverAsk.saveToDisk"] =
//         "text/csv";
//       return options;
//     }
//   });

//   on("task", {
//     isExistPDF(PDFfilename, ms = 4000) {
//       console.log(
//         `looking for PDF file in ${downloadDirectory}`,
//         PDFfilename,
//         ms
//       );
//       return hasPDF(PDFfilename, ms);
//     },
//   });

//   return config;
// };

/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};

const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
module.exports = (on, config) => {
  on("task", { downloadFile });
};

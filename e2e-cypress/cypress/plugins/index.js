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
const { outputJson } = require('fs-extra');

function seed(data) {
  console.log(__dirname);
  return outputJson(`${__dirname}/../../../db/db.test.json`, data);
}

module.exports = (on, config) => {
  on('task', {
    'seed:db' (data) {
      return seed(data).then(() => {
        return data;
      });
    },
  })
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}

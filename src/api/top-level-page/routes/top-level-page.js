'use strict';

/**
 * top-level-page router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::top-level-page.top-level-page');

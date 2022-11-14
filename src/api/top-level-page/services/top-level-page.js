'use strict';

/**
 * top-level-page service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::top-level-page.top-level-page');

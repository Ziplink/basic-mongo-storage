'use strict';
/**
 * Promise Wrapper for Ziplink Model
 */
var Ziplink = require('./lib/model.js');
var Promise = require('bluebird');

function findById(id) {
  return Ziplink.findByID(id);
}

function editZiplink(id, ziplinkData) {
  return Ziplink.editZiplink(id, ziplinkData);
}

function createZiplink(ziplinkData) {
  return Ziplink.create(ziplinkData);
}

module.exports = exports = {
  findById: findById,
  editZiplink: editZiplink,
  createZiplink: createZiplink,
};
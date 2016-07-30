'use strict';
/**
 * Promise Wrapper for Ziplink Model
 */
var Ziplink = require('./lib/model.js');
var Promise = require('bluebird');

function findById(id) {
  return new Promise(function(resolve, reject) {
    Ziplink.findByID(id, function(err, ziplink) {
      if (err) {
        reject(err);
      } else {
        resolve(ziplink);
      }
    });
  });
}

function editZiplink(id, ziplinkData) {
  return new Promise(function(resolve, reject) {
    Ziplink.editZiplink(id, ziplinkData, function(err, ziplink) {
      if (err) {
        reject(err);
      } else {
        resolve(ziplink);
      }
    });
  });
}

function createZiplink(ziplinkData) {
  return new Promise(function(resolve, reject) {
    Ziplink.create(ziplinkData, function(err, ziplink) {
      if (err) {
        reject(err);
      } else {
        resolve(ziplink);
      }
    });
  });
}

module.exports = exports = {
  findById: findById,
  editZiplink: editZiplink,
  createZiplink: createZiplink,
};
'use strict';

var chai = require('chai');
var expect = chai.expect;
var Ziplink = require('../index.js');

var DEFAULT_ZIPLINK_NAME = 'Ziplink';
var TEST_DATA = require('./data/testData.json');
var UPDATE_DATA = require('./data/updateData.json');

describe('ziplink-basic-mongo-storage', function() {

  describe('createZiplink(ziplinkData, callback)', function() {

    TEST_DATA.forEach(function(testData, index) {

      it('creates Ziplink from TEST_DATA[' + index + ']', function(done) {

        Ziplink.createZiplink(testData)
          .then(function(ziplink) {
            expect(ziplink).to.exist;
            expect(ziplink.name)
              .to.equal(testData.name || DEFAULT_ZIPLINK_NAME);

            // Save the ID so we can find this again later
            if (ziplink) {
              testData.ID = ziplink.ID;
            }
            done();
          }).catch(done);
      });

    });

  });

  describe('findByID(ID)', function() {

    TEST_DATA.forEach(function(testData, index) {

      it('finds correct Ziplink from TEST_DATA[' + index + ']', function(done) {
        Ziplink.findById(testData.ID)
          .then(function(ziplink) {
            expect(ziplink).to.exist;
            expect(ziplink.name)
              .to.equal(testData.name || DEFAULT_ZIPLINK_NAME);
            expect(ziplink.ID).to.equal(testData.ID);
            done();
          }).catch(done);

      });

    });

  });

  describe('editZiplink(ID, ziplinkData, cb)', function() {

    TEST_DATA.forEach(function(testData, index) {

      it('successfully updates Ziplink', function(done) {

        Ziplink.editZiplink(testData.ID, UPDATE_DATA)
          .then(function(ziplink) {
            expect(ziplink.name).to.equal(UPDATE_DATA.name);
            expect(ziplink.user.ID).to.equal(UPDATE_DATA.user.ID);
            expect(ziplink.sublinks[0].url)
              .to.equal(UPDATE_DATA.sublinks[0].url);
            done();
          }).catch(done);

      });

    });

  });

});
var chai = require('chai'),
  expect = chai.expect,
  Ziplink = require('../index.js');
  
const DEFAULT_ZIPLINK_NAME = 'Ziplink';
  
var TEST_DATA = [
  { //Simplest usable
    sublinks: [
      {
        url: 'google.com'
      }]
  },
  { //Names
    name: 'A Test',
    sublinks: [
      {
        url: 'google.com'
      }]
  },
  { //Multiple links
    sublinks: [
      {
        url: 'google.com'
      },
      {
        url: 'facebook.com'
      }]
  },
  { //Owned Ziplinks
    name: "Owned Ziplink",
    user: { id: "123456" },
    sublinks: [
      {
        url: 'google.com'
      }]
  }
];

var UPDATE_ZIPLINK = {
    name: "Updated Ziplink",
    user: { id: "Updated" },
    sublinks: [
      {
        url: 'updated.com'
      }]
};

describe('API v0.1', function(){
  
  describe('createZiplink(ziplinkData, callback)', function(){
    
    TEST_DATA.forEach(function(testData, index){
      
      it('creates Ziplink from TEST_DATA[' + index + ']', function(done){

        Ziplink.createZiplink(testData, function(err, ziplink){
          
          expect(ziplink).to.exist;
          expect(ziplink.name).to.equal(testData.name || DEFAULT_ZIPLINK_NAME);
            
          if(ziplink)
            testData.ID = ziplink.ID;
            
          done(err);
        });
        
      });
      
    });
    
  });
  
  describe('findByID(ID)', function(){
    
    TEST_DATA.forEach(function(testData, index){
      
      it('finds correct Ziplink from TEST_DATA[' + index + ']', function(done){
        Ziplink.findByID(testData.ID, function(err, ziplink){
          
          expect(ziplink).to.exist;
          expect(ziplink.name).to.equal(testData.name || DEFAULT_ZIPLINK_NAME);
          expect(ziplink.ID).to.equal(testData.ID);
          
          done(err);
          
        });
        
      });
      
    });
    
  });
  
  describe('editZiplink(ID, ziplinkData, cb)', function(){
    
    TEST_DATA.forEach(function(testData, index){
      
      it('successfully updates Ziplink', function(done){
        
        Ziplink.editZiplink(testData.ID, UPDATE_ZIPLINK, function(err, ziplink){
          
          expect(ziplink.name).to.equal(UPDATE_ZIPLINK.name);
          expect(ziplink.user.ID).to.equal(UPDATE_ZIPLINK.user.ID);
          expect(ziplink.sublinks[0].url).to.equal(UPDATE_ZIPLINK.sublinks[0].url);
          
          done(err);
        });
        
      });
      
    });
    
  });
  
});
var chai = require('chai'),
  expect = chai.expect,
  Ziplink = require('../index.js');
  
const DEFAULT_ZIPLINK_NAME = 'Ziplink';
  
const TEST_DATA = [
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
  }
];

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
  
});
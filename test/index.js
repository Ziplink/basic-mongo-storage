var expect = require('chai').expect,
  Ziplink = require('../index.js');
  
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
          if(!ziplink && !err)
            err = new Error('Neither ziplink nor err returned to callback');
            
          if(ziplink)
            testData.ID = ziplink.ID;
            
          done(err);
        });
        
      });
      
    });
    
  });
  
});
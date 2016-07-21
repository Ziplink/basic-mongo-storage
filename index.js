var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');
  
mongoose.Promise = require('bluebird');

var connection = mongoose.createConnection('mongodb://localhost/ziplink');

autoIncrement.initialize(connection);

var url = require('url');
var base = require('base-converter');

var ID_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

var ziplinkSchema = new Schema({
  name: {
    type: String,
    default: "Ziplink",
    maxlength: [64, 'Name too long']
  },
  sublinks: [{
    url: {
      type: String,
      required: true,
      minlength: [4, 'URL too short'],
      maxlength: [2083, 'URL too long']
    },
    protocol: {
      type: String,
      default: 'http:',
      required: true,
      enum: ['http:', 'https:', 'ftp:']
    }
  }]
});

/**
 *  Add the autoIncrement plugin to the schema
 *  Sets the _id of each Ziplink to the previous _id+1
 */
ziplinkSchema.plugin(autoIncrement.plugin, {
  model: 'Ziplink',
  field: '_id',
  startAt: 1
});

/**
 * Find Ziplink by ID
 * 
 * @param {string} ID
 */
ziplinkSchema.statics.findByID = function(ID, callback) {
  this.findById(base.genericToDec(ID, ID_ALPHABET), callback);
};


/**
 * Creates and saves a Ziplink
 * 
 * @param {object} ziplinkData
 * @param {string} name
 * @param {object[]} sublinks
 * @param {string} sublinks[].url
 */
ziplinkSchema.statics.createZiplink = function(ziplinkData, callback) {

  // Pull the protocol off the URL
  // This doesn't do any protocol checking, that is done by the supplied enum.
  ziplinkData.sublinks.forEach(function(sublink) {
    var urlObject = url.parse(sublink.url);

    // If `url` fails to parse the given URL we assume it's malformed in a way
    // and discard it
    if (urlObject === null)
      callback('The URL: ' + sublink.url + ' isn\'t a valid URL');

    // If we don't get a protocol, remove reference so mongoose uses default
    if (urlObject.protocol === null)
      delete urlObject.protocol;

    sublink.protocol = urlObject.protocol;

    //TODO: possibly store this information in component parts in DB
    sublink.url = urlObject.host || '' + urlObject.path || '' + urlObject.hash || '';
  });

  var newZiplink = new this(ziplinkData);

  newZiplink.save()
    .then(function(newZiplink){
    	callback(undefined, newZiplink);
    })
    .catch(callback);
};

/**
 * ID Virtual Property
 * 
 * @returns {string} - Returns the external ID of the Ziplink
 */
ziplinkSchema.virtual('ID').get(function() {
  return base.decToGeneric(this._id, ID_ALPHABET);
});

var Ziplink = connection.model('Ziplink', ziplinkSchema);

module.exports = exports = Ziplink;
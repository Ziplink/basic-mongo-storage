# ziplink-basic-mongo-storage
Simple DB handler to store Ziplinks in MongoDB

Follows a standard Ziplink Storage format and provides:
 - createZiplink(ziplinkData, callback)
 - findByShortID(shortID) //shortID is an ID encoded by ziplink-simple-encoder
 - findByNumericalID(numericalID) //numericalID is the _id value of the Ziplink
 - getEncodedID() //returns the encodedID of the ziplink
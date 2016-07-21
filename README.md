# ziplink-basic-mongo-storage
Simple DB handler to store Ziplinks in MongoDB using Ziplink Storage API v0.1

Follows a standard Ziplink Storage format and provides:
 - createZiplink(ziplinkData, callback)
 - findByID(ID) //returns the ziplink with the ID provided
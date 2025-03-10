const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/WrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

//home 
router.route ("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]") ,validateListing ,wrapAsync(listingController.createNew));




  // New Route
  router.get("/new" , isLoggedIn ,(listingController.renderNewForm) );

  router.route("/:id")
  .get(wrapAsync(listingController.renderShowListings))
  .put( isLoggedIn,
    isOwner ,
    upload.single("listing[image]") ,
    validateListing ,
    wrapAsync(listingController.updateRouter))
    .delete( 
      isLoggedIn, 
      isOwner, 
      wrapAsync(listingController.deleteListings));

  // Edit Route
  router.get ("/:id/edit" ,isLoggedIn, isOwner ,wrapAsync(listingController.editListings));

  
module.exports = router;
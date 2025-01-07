const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utlis/WrapAsync.js");
const ExpressError = require("../utlis/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview , isLoggedIn ,isReviewAuthor} = require("../middleware.js");

const reviewControllers = require("../controllers/reviews.js")

  // Post  Review route
  router.post("/", isLoggedIn ,validateReview ,wrapAsync(reviewControllers.createReview ));
   
   
   // Delete Review Route
   router.delete("/:reviewId" ,isReviewAuthor,isLoggedIn, wrapAsync(reviewControllers.destoryReview));
 

   module.exports = router;
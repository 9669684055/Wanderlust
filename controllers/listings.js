const Listing = require ("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await  Listing.find({});
    res.render("listings/index.ejs" , {allListings});
};

module.exports.renderNewForm = (req,res) => {
    res.render("Listings/new.ejs")
};

module.exports.renderShowListings = async (req,res) => {
    let {id} = req.params;
   const listing = await Listing.findById(id)
   .populate(
      {path: "reviews" , 
      populate: {
      path: "author", //nested populate used
   },
  }).populate("owner");
   if(!listing) {
      req.flash("error" , "Listing you requested for does not exist");
      res.redirect("/listings");
   }
   console.log(listing);
   res.render("listings/show.ejs",{listing});
};

module.exports.createNew = async (req,res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing( req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
   await  newListing.save();
   req.flash("success" , "New Listing Created");
   res.redirect("/listings");
    
};

module.exports.editListings = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
      req.flash("error" , "Listing you requested for does not exist");
      res.redirect("/listings");
   }
   let originalImageUrl = listing.image.url;
   originalImageUrl = originalImageUrl.replace("/upload" , "/upload/h_300,w_250");
    res.render("listings/edit.ejs" , {listing, originalImageUrl});
};

module.exports.updateRouter =async (req,res) => {
  let {id} = req.params;
   let listings = await Listing.findByIdAndUpdate(id , {...req.body.listing});
if(typeof req.file !== "undefined"){
   let url = req.file.path;
   let filename = req.file.filename;
   listings.image = { url, filename };
await listings.save();
}
  req.flash("success" , " Listing Updated");
  res.redirect(`/listings/${id}`);
  };

  module.exports.deleteListings = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success" , "Listing Deleted");
    res.redirect("/listings");
};
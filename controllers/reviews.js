const Review = require('../models/review.js');
const Listing = require("../models/listing.js");

module.exports.createReview = async(req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing)
        {
            console.log("Listing not found for ID:", id);
            throw new ExpressError(404, "Listing not found");
        }
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");

    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async(req, res) => {
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("error", "Review Deleted");
    res.redirect(`/listings/${id}`);
}


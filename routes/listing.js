const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
const listingController = require("../controllers/listings.js");

router.route("/")
.get(wrapAsync(listingController.index))  //index
.post(isLoggedIn, validateListing,upload.single('image'), wrapAsync(listingController.createNewListing)); //createlisting
// .post(upload.single('image'),(req, res) => {
//     res.send(req.file);
// })
// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editNewListing));

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))
.put(isLoggedIn, isOwner, validateListing,upload.single('image'), wrapAsync(listingController.updateListing));

module.exports = router;
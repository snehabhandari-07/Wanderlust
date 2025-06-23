const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl, validateUser } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
.get(wrapAsync(userController.renderSignupForm))
.post(validateUser, wrapAsync(userController.signup));

router.route("/login")
.get(wrapAsync(userController.renderLoginForm))
.post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), wrapAsync(userController.login));

// Logout
router.get("/logout", userController.logout);

module.exports = router;
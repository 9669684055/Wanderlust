const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utlis/WrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signup } = require("../controllers/users.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post( WrapAsync(userController.signup));

router.route("/login")
.get(userController.renderloginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),
userController.login
);

//Logout Router 
router.get("/logout" , userController.logout);


module.exports = router;
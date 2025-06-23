const User = require("../models/user.js");

module.exports.renderSignupForm = async (req, res) => {
    res.render("./users/signup.ejs");
}

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body.user;
        const newUser = new User({ email, username });
        let signupUser = await User.register(newUser, password);
        req.login(signupUser, (err) => {
            if (err) {
                return next(err);
            };
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = async(req, res) => {
    res.render("./users/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust! You are logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged Out!!");
        res.redirect("/listings");
    })
}
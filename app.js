if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Used for DELETE, PUT, PATCH request
const methodOverride = require("method-override");

const port = 5000;

// Boilerplate layout
const ejsMate = require("ejs-mate");

// Instead of using try-catch to throw error use ExpressError to throw errors
const ExpressError = require("./utils/ExpressError.js");

// This is the middleware that is responsible for session bet client & server
const session = require("express-session");
const MongoStore = require('connect-mongo');

// Flash is used to pop messages on screen after certain thing happens and is displayed only once
const flash = require("connect-flash");

// Middleware for hashing and salting of passwords
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
const dburl = process.env.ATLASDB_URL;
main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log(err);
})

async function main() {
    await mongoose.connect(dburl);
}

const store = MongoStore.create({
    mongoUrl: dburl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24*3600
})

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
})

// Options to for a session middleware
const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,  //sets an expiry date for a cookie
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}


// session and flash are used as middlewares
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/", (req, res) => {
//     res.send("Hii");
// })

// middleware for flash messages on ejs page
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    // console.log(res.locals.success);
    res.locals.currentUser = req.user;
    next();
})

// app.get("/demouser", async(req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     });

//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);

// })

// Listings
app.use("/listings", listingRouter);

// Reviews
app.use("/listings/:id/reviews", reviewRouter);

// Users
app.use("/user", userRouter);

// Middleware if someone tries to access the page which is not in app.js file 
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

// Error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "SOME ERROR OCCURED" } = err;
    res.status(statusCode).render("./listings/error.ejs", {message});
    // res.status(statusCode).send(message);
})

app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port}`);
})
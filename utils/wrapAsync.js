// Instead of using try-catch blocks use wrapAsync
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    }
}


// module.exports = wrapAsync;
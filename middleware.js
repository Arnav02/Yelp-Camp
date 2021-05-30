const Campground = require('./models/campground');
const Review = require('./models/review');
const ExpressError = require('./utils/ExpressError');
const { campgroundSchema, reviewSchema } = require('./schemas.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be Signed In first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else next();
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', "You don't have access to do that!");
        return res.redirect(`/campgrounds/${id}`);
    }
    else next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, ReviewId } = req.params;
    const review = await Review.findById(ReviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', "You don't have access to do that!");
        return res.redirect(`/campgrounds/${id}`);
    }
    else next();
}
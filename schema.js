const Joi = require('joi');

// Joi is used for server side validation before saving data in database
// After defining schema, we use validate function to throw error if conditions are not matched 
// Then we pass that function to routes
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object({
            filename: Joi.string().allow("", null),
            url: Joi.string().allow("", null)
        }),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required()
    }).required()
})

module.exports.userSchema = Joi.object({
    user : Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password : Joi.string().required()
    }).required()
});

// module.exports = listingSchema;
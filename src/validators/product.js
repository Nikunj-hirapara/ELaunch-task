const { check, validationResult } = require("express-validator");

exports.validateProduct = [
    check("name").notEmpty().withMessage("product name is required"),
    check("description").notEmpty().withMessage("description is required"),
    check("price").notEmpty().withMessage("price is required"),
    check("quantity").notEmpty().withMessage("quantity valid email"),
    check("category").notEmpty().withMessage("category is required"),
    check("createdBy").notEmpty().withMessage("created by is required")
  ];

  exports.isRequestValidate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0) {
        return res.status(400).json({errors: errors.array()[0].msg})
    }
    next();
}
const { check, validationResult } = require("express-validator");

exports.validateCategory = [
    check("name").notEmpty().withMessage("category name is required")
  ];

  exports.isRequestValidate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0) {
        return res.status(400).json({errors: errors.array()[0].msg})
    }
    next();
}
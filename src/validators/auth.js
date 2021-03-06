const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("first name is required"),
  check("lastName").notEmpty().withMessage("last name is required"),
  check("email").isEmail().withMessage("Please enter valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be grater than 6 character"),
];

exports.validateSigninRequest = [
    check("email").isEmail().withMessage("Please enter valid email"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be grater than 6 character"),
  ];

exports.isRequestValidate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0) {
        return res.status(400).json({errors: errors.array()[0].msg})
    }
    next();
}

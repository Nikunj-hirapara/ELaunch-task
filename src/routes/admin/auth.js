const express = require("express");
const { signup, signin, signout } = require("../../controller/admin/auth");
const { isRequestValidate, validateSignupRequest, validateSigninRequest } = require("../../validators/auth");
const router = express.Router();

router.post("/admin/signin", validateSigninRequest, isRequestValidate, signin)
router.post("/admin/signup", validateSignupRequest, isRequestValidate, signup);
router.post("/admin/signout", signout);

module.exports = router;
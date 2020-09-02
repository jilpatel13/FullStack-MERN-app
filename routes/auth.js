var express = require("express");
var router = express.Router();
const { body, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");


router.post("/signup",
    [
    body("name", "full name is required").isLength({min: 3}),
    body("email", "email is required").isEmail(),
    body("password", "password should be at least 5 char").isLength({min: 5})
    ],
    signup);

router.post("/signin",
    [
    body("email", "email is required").isEmail(),
    body("password", "incorrect password, try again").isLength({min: 5})
    ],
    signin);

router.get("/signout", signout);

module.exports = router;
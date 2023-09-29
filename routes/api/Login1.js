const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const Login1 = require("../../models/Login1");

//Post Router api/users/register
Router.post("/register1", (req, res) => {
  //Form Validation
  //Destructuring Values
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Login1.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists",
      });
    } else {
      const newUser = new Login1({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      //Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(
              (user) => res.json(user)
              // res.redirect('/users/login')
            )
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//Post Router api/users/login

Router.post("/login1", (req, res) => {
  //Login Validation
  const { errors, isValid } = validateLoginInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find User By Email
  Login1.findOne({
    email: email,
  }).then((user) => {
    //Check if Your Exists
    if (!user) {
      return res.status(404).json({
        emailNotFound: "Email is not registered",
      });
    }

    //Match Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User Matched
        //Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        //Sign Token
        //information that needs to be places into the payload
        jwt.sign(
          payload,
          config.get("secretOrKey"), 
          {
            expiresIn: 63113852, //2 years in seconds    ‬
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token,
            });
          }
        );
      } else {
        return res.status(400).json({
          passwordIncorrect: "Password incorrect",
        });
      }
    });
  });
});

module.exports = Router;

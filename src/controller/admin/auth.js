const User = require("../../models/user");
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(400).json({
        message: "Admin Already registered",
      });
    }

    const { firstName, lastName, email, password } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
      role: "admin"
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "Admin created Successfully..!",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if(error) return res.status(400).json({error})
    if(user) {
      if(user.role === "admin") {
        if(user.authenticate(req.body.password)) {
          const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"})
          const { _id ,firstName, lastName, email, role, fullName } = user;
          res.status(200).json({
            token,
            user: {
              _id ,firstName, lastName, email, role, fullName
            }
          })
        }else {
          return res.status(400).json({ message: "Invalid credential" })  
        }
      }else {
        return res.status(400).json({ message: "You have not an access" })
      }
    }else{
      return res.status(400).json({ message: "User is not found" })
    }
  })
}

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};
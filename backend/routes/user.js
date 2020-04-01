const express =  require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    console.log(req.body.email);
    const user = new User({
      email: req.body.email,
      password: hash
    });
    //console.log(user);
    user.save().then(result => {
      res.status(201).json({
        messege: "User Created",
        result: result
      });
      //console.log(result.result);
    })
    .catch(err => {
        //console.log(err);
         res.status(500).json({
           error: err
         });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fatchedUser;
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
     return res.status(401).json({
        message: "auth failed"
      });
    }
    fatchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if (!result) {
      return res.status(401).json({
        message: "auth failed"
      });
    }
    const token = jwt.sign({email: fatchedUser.email, userId: fatchedUser._id},
       'secert_this_should_be_longer',
       {expiresIn: '1h'}
      );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fatchedUser._id
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "auth failed"
    });
  });
})
module.exports = router;


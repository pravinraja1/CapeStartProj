const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken')
const {JWT_KEY} = require('../config/db.config')
const bcrypt = require('bcryptjs')

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(501).send({
      message: "Email can not be empty!"
    });
    return;
  }



  // Save User in the database
  User.findAll({ where: {email:req.body.email}})
  .then((savedUser)=>{
      if(savedUser==null){
         res.status(501).json({message:"User already Exists With That Email","status":false})
         return;
      }
      bcrypt.hash(req.body.password,12)
      .then(hashedpassword=>{
        const user = {
            email:  req.body.email,
            password:  hashedpassword,
            first_name:  req.body.first_name,
            last_name:  req.body.last_name,
            city:  req.body.city,
            address:  req.body.address,
            mobile_number:  req.body.mobile_number,
            pin_code: req.body.pin_code,
            otp: "",
            role: "user"
          };
            User.create(user)
                .then(data => {
                res.send(data);
                })
                .catch(err => {
                    res.status(501).json({message:"User cannot be created","status":false})
                    return;
                });
        });
    });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
    User.findAll({})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      });
};

// Retrieve one User from the database.
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving User."
        });
      });
};


exports.signIn = (req, res) => {
    try {
    // Validate request
    const {email,password,} = req.body
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "Please enter required details"});
      return;
    }
  
    User.findOne({where :{email:email}})
    .then((savedUser)=>{
        if(!savedUser){
          res.status(501).json({message:"Invalid Email or Password","status":false})
          return;
        }
        bcrypt.compare(password,savedUser.password)
        .then(match=>{
          if(match){
            const token= jwt.sign({id:savedUser.dataValues.id},JWT_KEY)
            res.send({"token":token,"status":true,"role":savedUser.dataValues.role})
            return;
          }else{
            res.status(501).json({message:"Invalid Email or Password","status":false})
            return;
          }
        })
        .catch(err => {
          res.status(501).json({message:"Invalid Email or Password","status":false})
          return;
        })
      })
    }catch(err){
      res.status(500).send({"message":"Something Went Wrong In User SigIn"});
      return;
    }
  };


  exports.createOtp = (req, res) => {
    try {
    const Email=req.body.email;
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    var data = {
      "otp":otp,
      "email":Email,
      "subject": "Request for change password",
    }
    trigger("otp",data)

    User.update({otp: otp},{
        where: { email: Email }
        }).then(num => {
            if (num == 1) {
              res.send({
                message: "OTP was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update OTP`
              });
            }
          })
          .catch(err => {
            res.status(500).send({"message":"Something Went Wrong In Create OTP"});
            return;
          });     
  }catch(err){
    res.status(500).send({"message":"Something Went Wrong In Create OTP"});
    return;
  }
  };
  
  
  exports.verifyOtp = (req, res) => {
    try {
    var email =req.body.email;
    var otp   =req.body.otp;
  
    User.findOne({email:email,otp:otp}).then((savedUser)=>{
        if(!savedUser){
          res.status(501).json({message:"Verification Failed","status":false})
          return;
      }else{
        res.send({"status":true,"message":"Email and OTP Found"});
        return;
      }
    });
  }catch(err){
    res.status(500).send({"message":"Something Went Wrong In Verify OTP"});
    return;
  }
  };


  exports.updatePassword = (req, res) => {
    try {
    var email =req.body.email;
    var password   =req.body.password;
  
    bcrypt.hash(password,12)
    .then(hashedpassword=>{
    User.update({ password: hashedpassword },{where:{ email:email}}).then(num => {
        if (num == 1) {
          res.send({
            message: "Password was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Password`
          });
        }
      })
      .catch(err => {
        res.status(500).send({"message":"Something Went Wrong In Updating Password"});
        return;
      });    
    })
  }catch(err){
    res.status(500).send({"message":"Something Went Wrong In User Update Password"});
    return;
  }
  };
const auth  = require('../middleware/auth')
module.exports = app => {
    const user = require("../controllers/user.controller");
    var router = require("express").Router();
    // user
    // Create a new user
  router.post('/user',(req, res)=> {
      user.create(req,res)
  });

    // Retrieve all user
  router.get('/user',(req, res) => {
      user.findAll(req,res)
  });
  
  router.get('/details/:id',(req, res) => {
      user.findOne(req,res)
  });

  router.post('/get-token',(req, res)=> {
    user.signIn(req,res)
  });
  
  router.post('/otp',(req, res)=> {
    user.createOtp(req,res)
  });
  
  router.post('/verify-otp',(req, res)=> {
    user.verifyOtp(req,res)
  });
  
  router.post('/password',(req, res)=> {
    user.signIn(req,res)
  });

    app.use('/', router);
  };
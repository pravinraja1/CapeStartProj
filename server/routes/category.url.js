const auth  = require('../middleware/auth');
const file_middleware  = require('../middleware/file_middleware');
const upload = file_middleware.upload;

module.exports = app => {
    const category = require("../controllers/category.controller");
    var router = require("express").Router();

  router.post('/category/author',auth,(req, res)=> {
    category.addAuthor(req,res)
  });
  router.post('/category/publisher',auth,(req, res)=> {
    category.addPublisher(req,res)
  });
  router.get('/getauthor',auth,(req, res)=> {
    category.findAllAuthor(req,res)
  });
  router.get('/getpublisher',auth,(req, res)=> {
    category.findALLPublisher(req,res)
  });


    app.use('/', router);
  };
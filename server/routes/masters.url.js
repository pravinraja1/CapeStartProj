const auth  = require('../middleware/auth');
const file_middleware  = require('../middleware/file_middleware');
const upload = file_middleware.upload;

module.exports = app => {
    const master = require("../controllers/masters.controller");
    var router = require("express").Router();
    // user
    // Create a new user
  router.post('/masters/book',auth,upload.single('book_image'),(req, res)=> {
    master.createBook(req,res)
  });

    // Retrieve all user
  router.get('/masters/book',auth,(req, res) => {
    master.findAllBook(req,res)
  });
  
  router.get('/masters/book/lended',auth,(req, res) => {
    master.findLendedBook(req,res)
  });
  
  router.get('/masters/book/notlended',auth,(req, res) => {
    master.findNotLendedBook(req,res)
  });

  router.get('/book/lend/:id',auth,(req, res) => {
    master.lendBook(req,res)
});

router.get('/book/delete/:id',auth,(req, res) => {
    master.deleteBook(req,res)
});

router.get('/book/notlend/:id',auth,(req, res) => {
    master.notLendBook(req,res)
});
  router.post('/book/update/:id',auth,upload.single("book_image"),(req, res) => {
    master.updateBook(req,res)
});
router.get('/masters/library/:id',auth,(req, res) => {
    master.getBook(req,res)
});
router.get('/masters/chart',auth,(req, res) => {
    master.getchartdata(req,res)
});

    app.use('/', router);
  };
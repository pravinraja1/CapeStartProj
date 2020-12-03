const { id } = require("@swimlane/ngx-charts");
const db = require("../models");
const Book = db.Book;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.createBook = (req, res) => {


    const book = {
        book_name:  req.body.book_name,
        book_desc:  req.body.book_desc,
        book_author:  req.body.book_author,
        publisher_name:  req.body.publisher_name,
        book_image:  req.file.filename,
      };

      Book.create(book)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
                res.status(501).json({message:"Book cannot be created","status":false})
                return;
            });

};

// Retrieve all User from the database.
exports.findAllBook = (req, res) => {
    Book.findAll({where:{is_active:"Y"}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Books."
        });
      });
};

// Retrieve all User from the database.
exports.findLendedBook = (req, res) => {
  Book.findAll({where : {is_active:"Y",status:"Y",lend_by:req.userId}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Books."
      });
    });
};

// Retrieve all User from the database.
exports.findNotLendedBook = (req, res) => {
  Book.findAll({where : {is_active:"Y",status:"N"}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Books."
      });
    });
};


exports.lendBook = (req, res) => {
  try {
  const id=req.params.id;

    console.log(req.body);
  Book.update({status: "Y",lend_by:req.userId,is_active:"Y"},{
      where: { id: id }
      }).then(num => {
          if (num == 1) {
            res.send({
              message: "Book was lended successfully."
            });
          } else {
            res.send({
              message: `Cannot lend Book`
            });
          }
        })
        .catch(err => {
          res.status(500).send({"message":"Something Went Wrong In Lending Book"});
          return;
        });     
    }catch(err){
      res.status(500).send({"message":"Error In Lending Book"});
      return;
    }
};

exports.deleteBook = (req, res) => {
  try {
  const id=req.params.id;
  Book.findOne({where : {id:req.params.id,status:"Y"}})
    .then(data => {
      if(data){
        res.status(501).send({"message":"Book was lended"});
          return;
      }else{
        Book.update({is_active:"N"},{
          where: { id: id }
          }).then(num => {
              if (num == 1) {
                res.send({
                  message: "Book was deleted successfully."
                });
              } else {
                res.send({
                  message: `Cannot delete Book`
                });
              }
            })
            .catch(err => {
              res.status(500).send({"message":"Something Went Wrong In deleting Book"});
              return;
            });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Books."
      });
    });
    }catch(err){
      res.status(500).send({"message":"Error In deleting Book"});
      return;
    }
};

exports.notLendBook = (req, res) => {
  try {
  const id=req.params.id;


  Book.update({status: "N",is_active:"Y"},{
      where: { id: id }
      }).then(num => {
          if (num == 1) {
            res.send({
              message: "Book was lended successfully."
            });
          } else {
            res.send({
              message: `Cannot lend Book`
            });
          }
        })
        .catch(err => {
          res.status(500).send({"message":"Something Went Wrong In Lending Book"});
          return;
        });     
    }catch(err){
      res.status(500).send({"message":"Error In Lending Book"});
      return;
    }
};

exports.updateBook = (req, res) => {
  try {
  const id=req.params.id;

  const book = {
    book_name:  req.body.book_name,
    book_desc:  req.body.book_desc,
    book_author:  req.body.book_author,
    publisher_name:  req.body.publisher_name
  };

  if(req.body.book_image!=""){
    const tempData={
      book_image:req.file.filename
    }
    Object.assign(book,tempData);
  }

  Book.update(book,{
      where: { id: id }
      }).then(num => {
          if (num == 1) {
            res.send({
              message: "Book was lended successfully."
            });
          } else {
            res.send({
              message: `Cannot lend Book`
            });
          }
        })
        .catch(err => {
          res.status(500).send({"message":"Something Went Wrong In Lending Book"});
          return;
        });
    }catch(err){
      res.status(500).send({"message":"Error In Lending Book"});
      return;
    }
};

exports.getBook = (req, res) => {
  Book.findOne({where : {id:req.params.id}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Books."
      });
    });
};

exports.getchartdata = async(req, res) => {
  author = await db.sequelize.query("call books_chart(@totalBooks,@BooksInLend,@BooksAVilable)", {
      type: db.sequelize.QueryTypes.SELECT
    });
    console.log(totalBooks);
    console.log(BooksInLend);
    console.log(BooksAVilable);
  if (author){
      res.send(author[0]);
  }else{
      res.status(501).json({message:"Author cannot found","status":false})
      return;
  }
};


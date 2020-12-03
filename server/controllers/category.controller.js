const db = require("../models");
const Author = db.category.Author;
const Publisher = db.category.Publisher;
const Op = db.Sequelize.Op;

exports.addPublisher = (req, res) => {


    const publisher = {
        publisher_name:  req.body.name,
      };

      Publisher.create(publisher)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
                res.status(501).json({message:"Author Added be Master","status":false})
                return;
            });

};

exports.addAuthor = (req, res) => {


    const author = {
        author_name:  req.body.name,
      };

      Author.create(author)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
                res.status(501).json({message:"Author Added be Master","status":false})
                return;
            });

};

exports.findAllAuthor = async(req, res) => {
    author = await db.sequelize.query('call book_author', {
        type: db.sequelize.QueryTypes.SELECT
      });
    if (author){
        res.send(author[0]);
    }else{
        res.status(501).json({message:"Author cannot found","status":false})
        return;
    }
};
exports.findALLPublisher = async(req, res) => {

    publisher = await db.sequelize.query('call publishers', {
        type: db.sequelize.QueryTypes.SELECT
      });
    if (publisher){
        res.send(publisher[0]);
    }else{
        res.status(501).json({message:"Publisher cannot found","status":false})
        return;
    }
};




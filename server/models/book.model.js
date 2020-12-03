module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
        book_name: {
        type: Sequelize.STRING
      },
      book_desc: {
        type: Sequelize.STRING
      },
      book_author: {
        type: Sequelize.STRING
      },
      publisher_name: {
        type: Sequelize.STRING
      },
      book_image: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      lend_by: {
        type: Sequelize.INTEGER
      }
    });
  
    return Book;
  };
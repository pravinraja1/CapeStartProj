module.exports = (sequelize, Sequelize) => {
   const Author = sequelize.define("author", {
        author_name: {
        type: Sequelize.STRING
        }
    });

   const Publisher = sequelize.define("publisher", {
        publisher_name: {
        type: Sequelize.STRING
        }
    });
    return {Author:Author,Publisher:Publisher};
  };
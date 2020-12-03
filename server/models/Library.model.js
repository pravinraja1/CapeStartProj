module.exports = (sequelize, Sequelize) => {
  const Library = sequelize.define("library", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.INTEGER
    },
    mobile_number: {
      type: Sequelize.INTEGER
    },
    otp: {
      type: Sequelize.INTEGER
    },
    role: {
      type: Sequelize.INTEGER
    }
  });

  return Library;
};

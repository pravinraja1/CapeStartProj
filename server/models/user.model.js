module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    mobile_number: {
      type: Sequelize.INTEGER
    },
    pin_code: {
      type: Sequelize.INTEGER
    },
    otp: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    }
  });

  return User;
};



module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    name: {
      type: Sequelize.STRING,
    },

    email: {
      type: Sequelize.STRING,
    },

    password: {
      type: Sequelize.STRING,
    },
  });

  return User;
};

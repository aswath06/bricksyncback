'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    userrole: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    balance: { type: DataTypes.FLOAT, defaultValue: 0 },
    advance: { type: DataTypes.FLOAT, defaultValue: 0 },
    dateOfBirth: DataTypes.DATEONLY,
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true,
    },
    statements: { type: DataTypes.JSON, defaultValue: [] },
  });

  // Auto-generate sequential userid
  User.beforeCreate(async (user, options) => {
    const lastUser = await User.findOne({
      order: [['createdAt', 'DESC']],
    });
    let nextId = 1;
    if (lastUser && lastUser.userid) {
      nextId = parseInt(lastUser.userid) + 1;
    }
    user.userid = nextId.toString().padStart(6, '0'); // e.g., 000001
  });

  return User;
};

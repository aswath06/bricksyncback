'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    availableSizes: {
      type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL only
      allowNull: false,
      defaultValue: [],
    },
    typeOptions: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  }, {});

  // Optional: auto-generate ID if needed
  Product.beforeCreate(async (product, options) => {
    if (!product.id) {
      product.id = 'P' + Date.now(); // simple unique ID
    }
  });

  return Product;
};

const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false
  },
  size: {
    type: Sequelize.FLOAT
  },
  gender: {
    type: Sequelize.ENUM('Male', 'Female')
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Product

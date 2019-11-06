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
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  gender: {
    type: Sequelize.ENUM('Male', 'Female')
  },
  price: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://clipart-library.com/images/E8T6M78iE.jpg'
  }
})

module.exports = Product

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
    type: Sequelize.ENUM('Men', 'Women')
  },
  price: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://cdn1.shoebacca.com/catalog/product/3/6/368151-02_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  }
})

module.exports = Product

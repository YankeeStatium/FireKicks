const router = require('express').Router()
const Product = require('../db/models/product')

router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params.id
    const product = await Product.findByPk(id)
    res.json(product)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.get('/', async function(req, res, next) {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router

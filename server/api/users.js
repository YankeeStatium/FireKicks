const router = require('express').Router()
const {User, Order, Product, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET ALL ORDERS FOR USER
router.get('/:id/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// GET PENDING ORDER FOR USER (CART)
router.get('/:id/order/pending', async (req, res, next) => {
  try {
    const [order, _] = await Order.findOrCreate({
      where: {
        userId: req.params.id,
        status: 'Pending'
      },
      include: [{model: Product}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

// ADD ITEM TO PENDING ORDER OR CREATE NEW PENDING ORDER
router.put('/:id/order/pending', async (req, res, next) => {
  try {
    const product = req.body
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        status: 'Pending'
      },
      include: [{model: Product}]
    })
    let [orderItem, wasCreated] = await OrderItem.findOrCreate({
      where: {
        orderId: order.id,
        productId: product.id
      }
    })
    if (wasCreated === false) {
      orderItem.quantity++
      orderItem = await orderItem.save()
      console.log('INCREMENTING QUANTITY>>>>', orderItem.quantity)
    }
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/order/deleteItem/:prodId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'Pending'
      },
      include: [{model: Product}]
    })
    let orderItem = await OrderItem.findOne({
      where: {
        orderId: order.id,
        productId: req.params.prodId
      }
    })
    console.log('FOUND ORDER ITEM >>>>', orderItem)
    if (orderItem.quantity > 1) {
      orderItem.quantity--
      orderItem = await orderItem.save()
      console.log('DECREMENTING QUANTITY>>>>', orderItem.quantity)
    } else {
      console.log('Quantity less than 1, destroying')
      await orderItem.destroy()
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// COMPLETE ORDER (CHANGE FROM PENDING - COMPLETE)
router.put('/:id/order/complete', async (req, res, next) => {
  try {
    const order = await Order.update(
      {status: 'Completed'},
      {
        where: {
          userId: req.params.id,
          status: 'Pending'
        }
      }
    )
    res.json(order)
  } catch (err) {
    next(err)
  }
})

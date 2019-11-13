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

//UPDATE USER
router.put('/:id', async (req, res, next) => {
  const {id, email, gender} = req.body

  try {
    await User.update(req.body, {
      where: {id: req.params.id}
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//GET ALL ORDERS FOR USER
router.get('/:userId/orderHistory', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// GET PENDING ORDER FOR USER (CART)
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const [order, _] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
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
router.put('/:userId/cart', async (req, res, next) => {
  try {
    const product = req.body
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
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
    }
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

// DELETE ITEM FROM ORDER (CART)
router.delete('/:userId/cart/deleteItem/:prodId', async (req, res, next) => {
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
    if (orderItem.quantity > 1) {
      orderItem.quantity--
      orderItem = await orderItem.save()
    } else {
      await orderItem.destroy()
    }
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// COMPLETE ORDER (CHANGE FROM PENDING => COMPLETE)
router.put('/:userId/cart/complete', async (req, res, next) => {
  try {
    const order = await Order.update(
      {status: 'Completed'},
      {
        where: {
          userId: req.params.userId,
          status: 'Pending'
        }
      }
    )
    res.json(order)
  } catch (err) {
    next(err)
  }
})

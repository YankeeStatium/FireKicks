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

//CREATE ORDER
// router.post('/:id/order', async (req, res, next) => {
//   try {
//     const order = await Order.create({
//       status: 'Pending',
//       userId: req.params.id
//     })
//     res.json(order)
//   } catch (err) {
//     next(err)
//   }
// })

//GET PENDING ORDER FOR USER
router.get('/:id/orders', async (req, res, next) => {
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

//UPDATE ORDER STATUS
router.put('/:id/orders', async (req, res, next) => {
  try {
    const orders = await Order.update(
      {status: 'Completed'},
      {
        where: {
          userId: req.params.id,
          status: 'Pending'
        }
      }
    )
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//GET PENDING ORDERS FOR USER

//CREATE ORDERITEM
router.post('/:userId/orders/products/:prodId', async (req, res, next) => {
  try {
    const [userOrder, _] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'Pending'
      }
    })
    const [orderItem, wasCreated] = await OrderItem.findOrCreate({
      where: {
        orderId: userOrder.id,
        productId: req.params.prodId
      }
    })
    if (wasCreated) {
      orderItem.quantity += 1
    }
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

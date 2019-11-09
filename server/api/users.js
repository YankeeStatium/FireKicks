const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
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

//GET PENDING ORDER FOR USER
router.get('/:id/order', async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: {
        userId: req.params.id,
        status: 'Pending'
      },
      include: [{model: Product}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//UPDATE ORDER STATUS
router.put('/:id/order', async (req, res, next) => {
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

//CREATE ORDER
router.post('/:id/order', async (req, res, next) => {
  try {
    const order = await Order.create({
      status: 'Pending',
      userId: req.params.id
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

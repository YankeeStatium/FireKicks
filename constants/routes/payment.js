const stripe = require('../../server/stripe')
const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({error: stripeErr})
  } else {
    //Come back later and set oder to complete here
    res.status(200).send({success: stripeRes})
  }
}
const cors = require('cors')
const bodyParser = require('body-parser')
const CORS_WHITELIST = require('../frontend')
const corsOptions = {
  origin: (origin, callback) =>
    CORS_WHITELIST.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS' + origin))
}

const paymentApi = app => {
  app.use('/stripe-checkout', cors(corsOptions))
  app.get('/stripe-checkout', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString()
    })
  })
  app.post('/stripe-checkout', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res))
  })
  return app
}
module.exports = paymentApi

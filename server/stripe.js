const configureStripe = require('stripe')
const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === 'production'
    ? 'sk_test_KtmPXiswrYSKXIzahh2l5jLC00DQA7TUmA'
    : 'sk_test_KtmPXiswrYSKXIzahh2l5jLC00DQA7TUmA'
const stripe = configureStripe(STRIPE_SECRET_KEY)
module.exports = stripe

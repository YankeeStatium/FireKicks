const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_P1fApIj3s0uCXHAvJYjaNvso00s0voFBFe'
    : 'pk_test_P1fApIj3s0uCXHAvJYjaNvso00s0voFBFe'
export default STRIPE_PUBLISHABLE

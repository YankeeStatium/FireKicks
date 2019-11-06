import React from 'react'
import {connect} from 'react-redux'

export const Cart = props => {
  const cart = props.cart

  return (
    <div id="cart">
      {cart.length === 0 ? (
        <h3>Your cart is empty. </h3>
      ) : (
        <div className="cartItem">
          {cart.map(shoe => (
            <div key={shoe.id}>
              <h1>{shoe.name}</h1>
              <h2>{shoe.quantity}</h2>
              <img src={shoe.imageUrl} />
              <button>Remove From Cart</button>
              <button>Checkout</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.products.cart
})

export default connect(mapStateToProps, null)(Cart)

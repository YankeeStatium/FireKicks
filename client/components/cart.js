import React from 'react'
import {connect} from 'react-redux'

export const Cart = props => {
  console.log('CART PROPS>>>>>', props)
  const cart = props.cart.items
  const total = props.cart.total

  return (
    <div id="cart">
      {cart.length === 0 ? (
        <h3>Your cart is empty. </h3>
      ) : (
        <div className="cart">
          {cart.map(shoe => (
            <div className="cartItem" key={shoe.id}>
              <h4>{shoe.name}</h4>
              <div>
                <h4>
                  Price: ${shoe.price / 100} Quantity: {shoe.quantity}
                </h4>
              </div>
              <img className="cartImg" src={shoe.imageUrl} />
              <div>
                <button className="button" type="submit">
                  Remove From Cart
                </button>
                <button className="button" type="submit">
                  Checkout
                </button>
              </div>
            </div>
          ))}
          <h4>Total: ${total}</h4>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.products.cart
})

export default connect(mapStateToProps, null)(Cart)

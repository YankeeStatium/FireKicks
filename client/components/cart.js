import React from 'react'
import {connect} from 'react-redux'
import {
  updateStatusThunk,
  removeFromCartThunk,
  getCartThunk
} from '../store/cart'
import {removeFromOrderThunk} from '../store/orders'
import {Link} from 'react-router-dom'

export class Cart extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.id
    if (userId) {
      this.props.fetchCart(userId)
    }
  }

  render() {
    const cart = this.props.cart.items
    const total = this.props.cart.total
    const changeStatus = this.props.changeStatus
    const userId = this.props.userId

    const handleRemove = shoe => {
      this.props.removeItem(shoe)
      if (userId) {
        this.props.removeFromOrder(userId, shoe)
      }
    }

    return (
      <div id="cart">
        {cart.length === 0 || cart.length === undefined ? (
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
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleRemove(shoe)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <h4>Total: ${total / 100}</h4>
            <Link to="/checkout">
              <button
                className="button"
                type="submit"
                onClick={() => changeStatus(userId)}
              >
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  fetchCart: userId => dispatch(getCartThunk(userId)),
  changeStatus: id => dispatch(updateStatusThunk(id)),
  removeItem: shoe => dispatch(removeFromCartThunk(shoe)),
  removeFromOrder: (userId, shoe) =>
    dispatch(removeFromOrderThunk(userId, shoe))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

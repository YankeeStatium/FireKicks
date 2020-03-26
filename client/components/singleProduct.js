import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectedProductsThunk} from '../store/products'
import {addToCartThunk} from '../store/cart'
import {addToOrderThunk, getOrderThunk} from '../store/orders'
import {Link} from 'react-router-dom'
//import Button from 'react-bootstrap/Button'

class SingleProduct extends Component {
  componentDidMount() {
    const prodId = this.props.match.params.id
    const userId = this.props.userId
    this.props.fetchProduct(prodId)
    if (userId) {
      this.props.initOrder(userId)
    }
  }

  handleClick(selectedProduct) {
    const userId = this.props.userId
    this.props.addToCart(selectedProduct)
    if (userId) {
      this.props.createOrder(userId, selectedProduct)
    }
  }

  render() {
    const selectedProduct = this.props.selectedProduct
    // const order = this.props.order
    // const addOrder = this.props.addOrder
    //Checking for an id works better because an empty obj would still be truthy
    if (selectedProduct === null) {
      return <h1>No shoes for you!</h1>
    }
    if (selectedProduct.id) {
      return (
        <div className="single_component">
          <h1>{selectedProduct.name}</h1>
          <h2>Brand: {selectedProduct.brand}</h2>
          <img src={selectedProduct.imageUrl} />
          <br />
          <button
            type="button"
            className="button"
            onClick={() => this.handleClick(selectedProduct)}
          >
            Add to Cart
          </button>
          <h3>Gender: {selectedProduct.gender}</h3>
          <h3>Sizes: {selectedProduct.size.join(', ')}</h3>
        </div>
      )
    } else {
      return 'Loading'
    }
  }
}
//with a sub reducer it goes a level deep
const productMapStateToProps = state => ({
  userId: state.user.id,
  selectedProduct: state.products.selectedProduct,
  pendingOrder: state.orders.pendingOrder
})

const productMapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(selectedProductsThunk(id)),
  addToCart: selectedProduct => dispatch(addToCartThunk(selectedProduct)),
  initOrder: userId => dispatch(getOrderThunk(userId)),
  createOrder: (userId, product) => dispatch(addToOrderThunk(userId, product))
})

const connectSingleProduct = connect(
  productMapStateToProps,
  productMapDispatchToProps
)(SingleProduct)

export default connectSingleProduct

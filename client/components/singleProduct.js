import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectedProductsThunk} from '../store/products'
import {addToCartThunk} from '../store/cart'
import {addOrderThunk, getPendingOrderThunk} from '../store/orders'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchProduct(id)
    this.props.getPendingOrder()
  }

  onClick(selectedProduct) {
    this.props.addToCart(selectedProduct)

    const pendingOrder = this.props.pendingOrder
    pendingOrder.userId
      ? console.log('Pending Order already exists for this User')
      : this.props.addOrder()
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
          <button onClick={() => this.onClick(selectedProduct)} type="button">
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
  getPendingOrder: () => dispatch(getPendingOrderThunk()),
  addOrder: userId => dispatch(addOrderThunk(userId))
})

const connectSingleProduct = connect(
  productMapStateToProps,
  productMapDispatchToProps
)(SingleProduct)

export default connectSingleProduct

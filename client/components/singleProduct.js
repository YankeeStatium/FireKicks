import React, {Component} from 'react'
import {connect} from 'react-redux'
import {selectedProductsThunk} from '../store/products'
import {addToCart, addToCartThunk, removeFromCartThunk} from '../store/cart'
import {Link} from 'react-router-dom'
//import Button from 'react-bootstrap/Button'

class SingleProduct extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchProduct(id)
  }

  handleClick(selectedProduct) {
    this.props.addToCart(selectedProduct)
  }

  render() {
    const selectedProduct = this.props.selectedProduct
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
  selectedProduct: state.products.selectedProduct
})

const productMapDispatchToProps = dispatch => ({
  fetchProduct: id => dispatch(selectedProductsThunk(id)),
  addToCart: selectedProduct => dispatch(addToCartThunk(selectedProduct))
})

const connectSingleProduct = connect(
  productMapStateToProps,
  productMapDispatchToProps
)(SingleProduct)

export default connectSingleProduct

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'

export class Products extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props.products

    return (
      <div id="products">
        {products.map(product => (
          <div className="product" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} />
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchtoDispatch = dispatch => ({
  getProducts: () => dispatch(getProductsThunk())
})

export default connect(mapStatetoProps, mapDispatchtoDispatch)(Products)

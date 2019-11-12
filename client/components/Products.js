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
    const shoes = (
      <div className="products">
        {products.map(product => (
          <div className="product" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img className="image" src={product.imageUrl} />
              <h3 style={{color: 'black', fontFamily: 'Arial'}}>
                {product.name}
              </h3>
              <h6 style={{color: 'black', fontFamily: 'Arial'}}>
                ${product.price / 100}
              </h6>
            </Link>
          </div>
        ))}
      </div>
    )

    return <div>{shoes}</div>
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

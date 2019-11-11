import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'
import CardDeck from 'react-bootstrap/CardDeck'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class Products extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props.products
    // const shoes = (
    //   <div id="products">
    //     {products.map(product => (
    //       <div className="product" key={product.id}>
    //         <Link to={`/products/${product.id}`} />
    //         <Link to={`/products/${product.id}`}>
    //           <img src={product.imageUrl} />
    //           <h3 style={{color: 'red', fontFamily: 'Arial'}}>
    //             {product.name}
    //           </h3>
    //         </Link>
    //       </div>
    //     ))}
    //   </div>
    // )
    return (
      <div>
        <CardDeck>
          {products.map(product => (
            <Card
              key={product.id}
              style={{width: '15px', height: '15px'}}
              className="text-center"
            >
              <Link to={`/products/${product.id}`}>
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Header as="h3">
                  <h3 style={{color: 'red', fontFamily: 'Arial', fontSize: 11}}>
                    {product.name}
                  </h3>
                </Card.Header>
              </Link>
              <Button variant="danger">Add</Button>
              {/* <Card.Body>
                <Card.Text />
                
              </Card.Body> */}
            </Card>
          ))}
        </CardDeck>
      </div>
    )
    // return <div>{shoes}</div>
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

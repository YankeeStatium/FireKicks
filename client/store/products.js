import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const SELECTED_PRODUCT = 'SELECTED_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const ADD_TO_CART = 'ADD_TO_CART'

const initialState = {
  products: [],
  selectedProduct: [],
  cart: [],
  total: 0
}

/*
* ACTION CREATORS
*/
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const selectedProduct = product => {
  //console.log('PRODUCT', product)
  return {
    type: SELECTED_PRODUCT,
    product
  }
}

const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
})

export const addToCart = productId => {
  console.log('ADDED ITEM', productId)
  return {
    type: ADD_TO_CART,
    productId
  }
}

//Thunk Creators
export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/product')
      dispatch(getProducts(data))
    } catch (err) {
      console.log('ERROR RETRIEVING ALL PRODUCTS', err)
    }
  }
}

export const selectedProductsThunk = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/product/${productId}`)
      console.log('My data', data)
      dispatch(selectedProduct(data))
    } catch (err) {
      console.log('ERROR RETRIEVING SINGLE PRODUCT', err)
    }
  }
}
//console.log('THUNK ==>', selectedProductsThunk(2)())

export const removeProductThunk = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/product/${productId}`)
      dispatch(removeProduct(productId))
    } catch (err) {
      console.log("CAN'T FIND PRODUCT", err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case SELECTED_PRODUCT:
      return {...state, selectedProduct: action.product}
    case ADD_TO_CART: {
      let addedItem = state.products.find(item => item.id === action.productId)
      let duplicate = state.cart.find(item => action.productId === item.id)

      if (duplicate) {
        addedItem.quantity += 1
        return {
          ...state,
          total: state.total + addedItem.price
        }
      } else {
        addedItem.quantity = 1
        let newTotal = state.total + addedItem.price

        return {
          ...state,
          cart: [...state.cart, addedItem],
          total: newTotal
        }
      }
    }
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== action.productId
        )
      }
    default:
      return state
  }
}

import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_USER'
const SELECTED_PRODUCT = 'SELECTED_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const initialState = {
  products: [],
  selected_product: null
}

/*
* ACTION CREATORS
*/
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})


const selectedProduct = product => ({
  type: SELECTED_PRODUCT,
  product
})

const removeProduct = productId => ({
  type: REMOVE_PRODUCT,
  productId
})

//Thunk Creators
export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get("/api/product");
      dispatch(getProducts(data));
    } catch (err) {
      console.log("ERROR RETRIEVING ALL PRODUCTS", err);
    }
  };
};

export const selectedProductsThunk = productId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/product/${productId}`);
      dispatch(selectedProduct(data));
    } catch (err) {
      console.log("ERROR RETRIEVING SINGLE PRODUCT", err);
    }
  };
};


export const removeProductThunk = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/product/${productId}`);
      dispatch(removeProduct(productId));
    } catch (err) {
      console.log("CAN'T FIND PRODUCT", err);
    }
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products }
    case SELECTED_PRODUCT:
      return { ...state, selected_product: action.product }
    case REMOVE_PRODUCT:
      return {
        ...state,
        campuses: state.products.filter(product => product.id !== action.productId)
      };
    default:
      return state
  }
}

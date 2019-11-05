import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_USER'
const SELECTED_PRODUCT = 'SELECTED_PRODUCT'

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

//Thunk Creators
export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(getProducts(data));
    } catch (err) {
      console.log("ERROR RETRIEVING CAMPUSES", err);
    }
  };
};

export const selectedProductsThunk = productId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      dispatch(selectedProduct(data));
    } catch (err) {
      console.log("ERROR RETRIEVING CAMPUS", err);
    }
  };
};


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products }
    case SELECTED_PRODUCT:
      return { ...state, selected_product: action.product }
    default:
      return state
  }
}

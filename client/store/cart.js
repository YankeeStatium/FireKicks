import axios from 'axios'
import history from '../history'

const ADD_TO_CART = 'ADD_TO_CART'

const initialState = {
  items: [],
  total: 0
}

export const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

export const addToCartThunk = productId => {
  return (dispatch, getState) => {
    const {products} = getState()
    dispatch(addToCart(products.selectedProduct))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      let addedItem = action.product
      let duplicate = state.items.find(item => action.product.id === item.id)

      console.log('THIS IS THE ITEM YOU"RE ADDING', addedItem)
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
          items: [...state.items, addedItem],
          total: newTotal
        }
      }
    }
    default:
      return state
  }
}

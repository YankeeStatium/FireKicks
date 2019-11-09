import axios from 'axios'
import history from '../history'

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

const initialState = {
  items: [],
  total: 0
}

//Action Creators
export const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

export const removeFromCart = product => ({
  type: REMOVE_FROM_CART,
  product
})

//Thunk Creators
export const addToCartThunk = selectedProduct => {
  return dispatch => {
    dispatch(addToCart(selectedProduct))
  }
}

export const removeFromCartThunk = product => {
  return dispatch => {
    dispatch(removeFromCart(product))
  }
}

export const updateStatusThunk = id => {
  return async (dispatch, getState) => {
    try {
      let {user} = getState()
      await axios.put(`/api/users/${user.id}/order`, {})
    } catch (error) {
      console.error('ORDER CANNOT BE UPDATED')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      let addedItem = action.product
      let duplicate = state.items.find(item => action.product.id === item.id)

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
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.product.id)
      }
    default:
      return {...state}
  }
}

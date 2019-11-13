import axios from 'axios'
import history from '../history'

const initialState = {
  orders: []
}

//ACTION TYPES
const ADD_TO_ORDER = 'ADD_TO_ORDER'
const REMOVE_FROM_ORDER = 'REMOVE_FROM_ORDER'
const GET_ORDER = 'GET_ORDER'

//ACTION CREATOR
const getOrder = order => ({
  type: GET_ORDER,
  order
})

const addToOrder = order => ({
  type: ADD_TO_ORDER,
  order
})

const removeFromOrder = product => ({
  type: REMOVE_FROM_ORDER,
  product
})

//THUNK CREATORS
export const getOrderThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getOrder(data))
    } catch (error) {
      console.error('Order could not be found')
    }
  }
}

export const addToOrderThunk = (userId, product) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}/cart`, product)
      dispatch(addToOrder(data))
    } catch (error) {
      console.error('Could not add to order', error)
    }
  }
}

export const removeFromOrderThunk = (userId, product) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(
        `/api/users/${userId}/cart/deleteItem/${product.id}`
      )
      dispatch(removeFromOrder(data))
    } catch (err) {
      console.error('Could not remove from order', err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {...state}
    case ADD_TO_ORDER:
      return {...state}
    default:
      return state
  }
}

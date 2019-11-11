import axios from 'axios'
import history from '../history'

const initialState = {
  pendingOrder: {},
  orders: {}
}

//ACTION TYPES
const ADD_ORDER = 'ADD_ORDER'
const GET_PENDING_ORDER = 'GET_PENDING_ORDER'

//ACTION CREATOR
const getPendingOrder = order => ({
  type: GET_PENDING_ORDER,
  order
})

const addOrder = userId => ({
  type: ADD_ORDER,
  userId
})

//THUNK CREATORS
export const getPendingOrderThunk = () => {
  return async (dispatch, getState) => {
    try {
      let {user} = getState()
      const {data} = await axios.get(`/api/users/${user.id}/order`)
      dispatch(getPendingOrder(data))
    } catch (error) {
      console.error('Order could not be found')
    }
  }
}

export const addOrderThunk = userId => {
  return async (dispatch, getState) => {
    try {
      const {data} = await axios.post(`/api/users/${userId}/order`)
      dispatch(addOrder(userId))
    } catch (error) {
      console.error('Order could not be added')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PENDING_ORDER:
      return {...state, pendingOrder: action.order}
    case ADD_ORDER:
      return {...state, orders: {...action.userId}}
    default:
      return state
  }
}

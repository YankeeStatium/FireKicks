import axios from 'axios'
import history from '../history'

const initialState = {
  pendingOrder: {}
}

//ACTION TYPES
const GET_PENDING_ORDER = 'GET_PENDING_ORDER'

//ACTION CREATOR
const getPendingOrder = order => ({
  type: GET_PENDING_ORDER,
  order
})

//THUNK CREATORS
export const getPendingOrderThunk = () => {
  return async (dispatch, getState) => {
    try {
      let {user} = getState()
      const {data} = await axios.get(`./api/users/${user.id}/order`)
      dispatch(getPendingOrder(data))
    } catch (error) {
      console.error('Order could not be found')
    }
  }
}

export const addOrderThunk = userId => {
  return async (dispatch, getState) => {
    try {
      await axios.post(`./api/users/${userId}/order`)
    } catch (error) {
      console.error('Order could not be added')
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PENDING_ORDER:
      return {...state, pendingOrder: action.order}
    default:
      return state
  }
}

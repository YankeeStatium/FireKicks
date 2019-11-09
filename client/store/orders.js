import axios from 'axios'
import history from '../history'

const initialState = {
  order: {}
}

//ACTION TYPES
const ADD_ORDER = 'GET_ORDERS'

//ACTION CREATOR
const addOrder = order => ({
  type: ADD_ORDER,
  order
})

//THUNK CREATORS
const addOrderThunk = (status, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`./api/users/${id}/order`, {
        status,
        id
      })
      dispatch(addOrder(data))
    } catch (error) {
      next(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return {...state, order: action.order}
    default:
      return state
  }
}

import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

export const updateUser = (userId, name, email, gender) => ({
  type: UPDATE_USER,
  userId,
  name,
  email,
  gender
})

/**
 * THUNK CREATORS
 */
export const updateUserThunk = (userId, name, email, gender) => {
  return async dispatch => {
    try {
      await axios.put(`/api/users/${userId}`, {
        name,
        email,
        gender
      })
      dispatch(updateUser(userId, name, email, gender))
    } catch (err) {
      console.err("USER CAN'T BE UPDATED")
    }
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      if (state.id === action.userId) {
        return {
          ...state,
          name: action.name,
          email: action.email,
          gender: action.gender
        }
      }
      return state
    default:
      return state
  }
}

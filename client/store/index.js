import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import productsReducer from './products'
import cartReducer from './cart'
import ordersReducer from './orders'
import {loadState, saveState} from './localStorage'

const persistedState = loadState()

const reducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedState, middleware)

// If no user is currently on state, we store cart in local storage
if (store.getState().user === {}) {
  store.subscribe(() => {
    saveState({cart: store.getState().cart})
  })
}

export default store
export * from './user'

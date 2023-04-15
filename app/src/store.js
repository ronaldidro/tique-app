import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension'
import shopReducer from './reducers/shopReducer'
import filterReducer from './reducers/filterReducer'
import productsOrderReducer from './reducers/productsOrderReducer'
import productReducer from './reducers/productReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    shop: shopReducer,
    filter: filterReducer,
    products: productReducer,
    productsOrder: productsOrderReducer,
    user: userReducer
  },
  devTools: composeWithDevTools()
})

export default store

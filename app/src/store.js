import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension'
import companyReducer from './reducers/companyReducer'
import filterReducer from './reducers/filterReducer'
import productsOrderReducer from './reducers/productsOrderReducer'
import productReducer from './reducers/productReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    company: companyReducer,
    filter: filterReducer,
    products: productReducer,
    productsOrder: productsOrderReducer,
    user: userReducer
  },
  devTools: composeWithDevTools()
})

export default store

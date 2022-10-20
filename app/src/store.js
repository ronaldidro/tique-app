import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from '@redux-devtools/extension'
import companyReducer from './reducers/companyReducer'
import filterReducer from './reducers/filterReducer'
import productsOrderReducer from './reducers/productsOrderReducer'
import productsReducer from './reducers/productsReducer'

const store = configureStore({
  reducer: {
    company: companyReducer,
    filter: filterReducer,
    products: productsReducer,
    productsOrder: productsOrderReducer
  },
  devTools: composeWithDevTools()
})

export default store

import { composeWithDevTools } from '@redux-devtools/extension'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import filterReducer from './reducers/filterReducer'
import productReducer from './reducers/productReducer'
import productsOrderReducer from './reducers/productsOrderReducer'
import shopReducer from './reducers/shopReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
  shop: shopReducer,
  filter: filterReducer,
  products: productReducer,
  productsOrder: productsOrderReducer,
  user: userReducer
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter', 'products']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: composeWithDevTools(),
  middleware: [thunk]
})

export const persistor = persistStore(store)

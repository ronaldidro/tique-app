import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import filterReducer from './reducers/filterReducer'
import productReducer from './reducers/productReducer'
import productsOrderReducer from './reducers/productsOrderReducer'
import shopReducer from './reducers/shopReducer'
import userReducer from './reducers/userReducer'
import { api } from './services/api'

const rootReducer = combineReducers({
  shop: shopReducer,
  filter: filterReducer,
  products: productReducer,
  productsOrder: productsOrderReducer,
  user: userReducer,
  [api.reducerPath]: api.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter', 'products', api.reducerPath]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
})

export const persistor = persistStore(store)

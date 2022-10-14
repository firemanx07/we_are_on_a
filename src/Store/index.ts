import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'

import { api } from '@/Services/api'
import theme from './Theme'
import filters from './Filters'
import regions from './Regions'
import restaurants from './Restaurants'
import chefs from './Chefs'
import reviews from './Reviews'
import { Slices } from '@/enums/Slices'

const reducers = combineReducers({
  theme,
  filters,
  regions,
  restaurants,
  chefs,
  reviews,
  api: api.reducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    Slices.FILTERS,
    Slices.THEME,
    Slices.REGIONS,
    Slices.RESTAURANTS,
    Slices.CHEFS,
    Slices.REVIEWS,
  ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware)

    // @ts-ignore
    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
  devTools: __DEV__,
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>

export { store, persistor }

import { configureStore,combineReducers,getDefaultMiddleware } from '@reduxjs/toolkit'
import todosReducer from './slices/TdosSlice'

import { persistStore, persistReducer,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
    todos : todosReducer
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist:[]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
})
export const persistor = persistStore(store)

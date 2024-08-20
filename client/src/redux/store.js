import { configureStore } from "@reduxjs/toolkit";
import {loadingSlice} from "./features/loadingSlice";
import {userSlice} from "./features/userSlice";
import { listingSlice } from "./features/listingSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    loading: loadingSlice.reducer,
    user: userSlice.reducer,
    listing: listingSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    version : 1
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }), 
});

export const persistor = persistStore(store);
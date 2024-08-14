import { configureStore } from "@reduxjs/toolkit";
import {loadingSlice} from "./features/loadingSlice";
import {userSlice} from "./features/userSlice";
export const store = configureStore({
    reducer:{
        loading: loadingSlice.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }), 
});


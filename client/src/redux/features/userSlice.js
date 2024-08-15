import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthorized: false
    },
    reducers:{
        setUser: (state, action) =>{
            state.user = action.payload;
        },
        setAuth: (state, action) =>{
            state.isAuthorized = action.payload
        }
    }
});

export const { setUser, setAuth } = userSlice.actions;
export default userSlice.reducer
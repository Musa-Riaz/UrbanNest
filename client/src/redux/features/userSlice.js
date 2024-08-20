import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isAuthorized: false,
    },
    reducers:{
        setUser: (state, action) =>{
            state.user = action.payload;
        },
        setAuth: (state, action) =>{
            state.isAuthorized = action.payload
        },
        setListing: (state, action) => {
            state.listing = action.payload;
        }
    }
});

export const { setUser, setAuth, setListing } = userSlice.actions;
export default userSlice.reducer
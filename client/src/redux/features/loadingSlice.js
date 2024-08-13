import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name:"loading",
    initialState:{
        isLoading: false
    },
    reducers:{
        setLoading: (state) =>{
            state.isLoading = true;
        },
        hideLoading:(state) =>{
            state.isLoading = false
        }
    }
});

export const { setLoading, hideLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
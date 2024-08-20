import { createSlice  } from '@reduxjs/toolkit';
export const listingSlice = createSlice({
    name: "listing",
    initialState: {
        listing: null,
    },
    reducers:{
        setListing: (state, action) =>{
            state.listing = action.payload;
        }
    }
});

export const { setListing } = listingSlice.actions
export default listingSlice.reducer;

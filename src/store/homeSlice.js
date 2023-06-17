import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const homeSlice = createSlice({
  name: 'home',
  initialState:{
    url:{},
    genres:{}
  },
  reducers: {
    getApiCofiguration: (state, action) =>{
        state.url = action.payload;
    },
    getGenres: (state, action) =>{
        state.genres = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { getApiCofiguration, getGenres } = homeSlice.actions

export default homeSlice.reducer
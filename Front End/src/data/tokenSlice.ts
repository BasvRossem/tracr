import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'tokenSlice',
  initialState: {
    value: ""
  },
  reducers: {
    setToken: (state, action) => {
      if(state.value !== action.payload)
        state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
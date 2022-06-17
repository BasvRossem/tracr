import { createSlice } from '@reduxjs/toolkit'

export const currentDateSlice = createSlice({
  name: 'currentDate',
  initialState: {
    value: new Date().toDateString(),
  },
  reducers: {
    setDate: (state, action) => {
      if(state.value !== action.payload)
        state.value = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDate } = currentDateSlice.actions;
export default currentDateSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

function getTodayAt(num) {
  const today = new Date();
  today.setHours(num);
  today.setMinutes(0);
  today.setSeconds(0);
  return today.toString();
}

export const selectedLogSlice = createSlice({
  name: 'selectedLogSlice',
  initialState: {
    isUpdateModal: false,
    startTime: getTodayAt(9),
    stopTime: getTodayAt(10),
    title: "",
    notes: "",
    id: -1
  },
  reducers: {
    reset: (state) => {
      state.isUpdateModal = false;
      state.startTime = getTodayAt(9);
      state.stopTime = getTodayAt(10);
      state.title = "";
      state.notes = "";
      state.id = -1;
    },
    set: (state, action) => {
      state.isUpdateModal = action.payload.isUpdateModal;
      state.startTime = action.payload.startTime.toString();
      state.stopTime = action.payload.stopTime.toString();
      state.title = action.payload.title;
      state.notes = action.payload.notes;
      state.id = action.payload.logId;
    },
    setIsUpdateModal: (state, action) => { state.isUpdateModal = action.payload },
    setStartTime: (state, action) => { state.startTime = action.payload.toString() },
    setStopTime: (state, action) => { state.stopTime = action.payload.toString() },
    setTitle: (state, action) => { state.title = action.payload },
    setNotes: (state, action) => { state.notes = action.payload },
    setLogId: (state, action) => { state.logId = action.payload }
  }
})

// Action creators are generated for each case reducer function
export const { reset, set, setIsUpdateModal, setStartTime, setStopTime, setTitle, setNotes, setLogId } = selectedLogSlice.actions;

export default selectedLogSlice.reducer;
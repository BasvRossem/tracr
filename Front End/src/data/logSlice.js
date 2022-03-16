import { createSlice } from '@reduxjs/toolkit';

export const logSlice = createSlice({
  name: 'logSlice',
  initialState: {
    value: [],
  },
  reducers: {
    addLogToState: (state, action) => {
      if(action.payload) {
        state.value.push(action.payload);
      }
    },
    setLogs: (state, action) => {
      let differ = false;
      
      if(state.value.length !== action.payload.length) differ = true;
      for (var i = 0; i < action.payload.length; ++i) {
        if (state.value[i] && state.value[i].id !== action.payload[i].id) differ = true;
      }

      if(differ)
        state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addLogToState, setLogs } = logSlice.actions;

export const addLog = payload => dispatch => {
  console.info("Adding new log");

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  };

  fetch(`${process.env.REACT_APP_BACKEND_URI}/tracr/logs`, requestOptions)
    .then(data => data.json())
    .then(json => json.data.items[0] ?? Promise.reject())
    .then(data => dispatch(addLogToState(data)))
    .catch(err => console.error(err));
};

export const updateLog = payload => dispatch => {
  console.info("Updating one log");

  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  };

  fetch(`${process.env.REACT_APP_BACKEND_URI}/tracr/logs`, requestOptions)
    .then(data => data.json())
    .then(json => json.data.items[0] ?? Promise.reject())
    .then(data => dispatch(getLogs()))
    .catch(err => console.error(err));
};

export const getLogs = payload => dispatch => {
  console.info("Getting logs for selected date", payload);

  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  
  const uri = `${process.env.REACT_APP_BACKEND_URI}/tracr/logs?date=${payload}`;
  fetch(uri, requestOptions)
    .then(data => data.json())
    .then(json => json.data.items ?? Promise.reject())
    .then(data => dispatch(setLogs(data)))
    .catch(err => console.error(err));
};

export const delLog = payload => dispatch => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  const uri = `${process.env.REACT_APP_BACKEND_URI}/tracr/logs?id=${payload}`;
  fetch(uri, requestOptions)
    .then(_ => dispatch(getLogs()))
    .catch(err => console.error(err));
};

export default logSlice.reducer;
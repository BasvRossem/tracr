import { createSlice } from '@reduxjs/toolkit';
import { logApiDate } from '../utils/time';
import { Storage } from './Storage';

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
      state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addLogToState, setLogs } = logSlice.actions;

const getHeaders = () => {
  return {
    'Content-Type': 'application/json', 
    'Authorization': sessionStorage.getItem("token")
  } 
};

export const addLog = payload => dispatch => {
  console.info("Adding new log");

  const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: payload
  };

  fetch(`${process.env.REACT_APP_BACKEND_URI}/tracr/logs`, requestOptions)
    .then(res => res.status !== 403 ? res : Promise.reject("Unauthorized"))
    .then(_ => dispatch(getLogs(logApiDate(new Date(JSON.parse(payload).date)))))
    .catch(err => console.error(err));
};

export const updateLog = payload => dispatch => {
  console.info("Updating one log");

  const requestOptions = {
    method: 'PATCH',
    headers: getHeaders(),
    body: payload
  };

  fetch(`${process.env.REACT_APP_BACKEND_URI}/tracr/logs`, requestOptions)
    .then(res => res.status !== 403 ? res : Promise.reject("Unauthorized"))
    .then(_ => dispatch(getLogs(logApiDate(new Date(JSON.parse(payload).date)))))
    .catch(err => console.error(err));
};

export const getLogs = payload => dispatch => {
  console.info("Getting logs for selected date", payload);

  const requestOptions = {
    method: 'GET',
    headers: getHeaders(),
  };
  
  const uri = `${process.env.REACT_APP_BACKEND_URI}/tracr/logs?date=${payload}`;
  fetch(uri, requestOptions)
    .then(res => res.status !== 403 ? res : Promise.reject("Unauthorized"))
    .then(data => data.json())
    .then(json => json.data?.items ?? Promise.reject())
    .then(data => dispatch(setLogs(data)))
    .catch(err => console.error(err));
};

interface DelLogPayload { 
  id: string; 
  date: string;
}

export const delLog = (payload: DelLogPayload) => dispatch => {
  console.info(`Deleting log ${payload.id}`);
  const requestOptions = {
    method: 'DELETE',
    headers: getHeaders(),
  };
  const uri = `${process.env.REACT_APP_BACKEND_URI}/tracr/logs?id=${payload.id}`;
  fetch(uri, requestOptions)
    .then(res => res.status !== 403 ? res : Promise.reject("Unauthorized"))
    .then(_ => dispatch(getLogs(logApiDate(new Date(payload.date)))))
    .catch(err => console.error(err));
};

export const getHealth = () => {
  const requestOptions = {
    method: 'Get',
    headers: { 'Content-Type': 'application/json' },
  };

  const uri = `${process.env.REACT_APP_BACKEND_URI}/tracr/health`;
  fetch(uri, requestOptions)
    .catch(err => console.error(err));
}

export default logSlice.reducer;
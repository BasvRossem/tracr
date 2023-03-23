import { createSlice } from '@reduxjs/toolkit';
import { logApiDate } from '../utils/time';
import { DateString, ILogDay, LogDay } from '../types';


export const logSlice = createSlice({
  name: 'logSlice',
  initialState: {
    value: { date: "", logs: [] },
  },
  reducers: {
    setDay: (state, action: { payload: ILogDay | undefined }) => {
      console.log("payload", action.payload)
      if (!action.payload)
        return;

      state.value = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDay } = logSlice.actions;

const getHeaders = () => {
  return {
    'Content-Type': 'application/json', 
    'Authorization': sessionStorage.getItem("token")
  } 
};

function prepIncomingData(days: LogDay[]): LogDay | undefined {
  days.forEach(day => {
    day.logs.forEach((log, index) => log.id = index.toString());
  })
  return days[0];
}

export const getDay = (payload: DateString) => dispatch => {
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
    .then(days => prepIncomingData(days))
    .then(day => dispatch(setDay(day)))
    .catch(err => console.error(err));
};

export const updateDay = (payload: LogDay) => dispatch => {
  console.info("Updating one log with", JSON.stringify(payload));

  const requestOptions = {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload) as unknown as BodyInit
  };

  fetch(`${process.env.REACT_APP_BACKEND_URI}/tracr/logs`, requestOptions)
    .then(res => res.status !== 403 ? res : Promise.reject("Unauthorized"))
    .then(_ => dispatch(getDay(logApiDate(new Date(payload.date)))))
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
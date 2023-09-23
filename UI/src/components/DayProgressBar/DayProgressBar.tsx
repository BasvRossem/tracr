import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { useSelector } from 'react-redux';
import { Log } from '../../types';
import { toTimeString } from '../../utils';

import { notIncludedInSummary } from '../../constants';
import { RootState } from '../../data/store';
import './DayProgressBar.css';

export function DayProgressBar() {
  const todaysLogs = useSelector((state: RootState) => state.logger.value.logs);
  let amount = 0;
  todaysLogs
    .filter((element: Log) => !notIncludedInSummary.includes(element.title))
    .forEach((element: Log) => {
      amount += new Date(element.stopTime).getTime() - new Date(element.startTime).getTime();
    });
  const amountInPercentage = amount / (8 * 60 * 60 * 1000) * 100;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: "0.5em" }}>
      <Box>
        <span style={{ whiteSpace: "nowrap", marginRight: "1em" }}>
          <b>{toTimeString(amount)}</b>
          <span style={{ color: 'grey' }}>
            {` (${Math.round(amountInPercentage)}%)`}
          </span>
        </span>
      </Box>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={amountInPercentage} />
      </Box>
    </Box>
  );
}
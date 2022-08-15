import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { toTimeString } from '../../utils';
import { Log } from '../../types';

import './DayProgressBar.css';
import { notIncludedInSummary } from '../../constants';

export function DayProgressBar() {
  const todaysLogs = useSelector((state: any) => state.logger);
  let amount = 0;
  todaysLogs.value
    .filter((element: Log) => !notIncludedInSummary.includes(element.title))
    .forEach((element: Log) => {
      amount += new Date(element.stopTime).getTime() - new Date(element.startTime).getTime();
    });
  const amountInPercentage = amount / (8 * 60 * 60 * 1000) * 100;

  return (
    <Box>
      <h3>Day progress - {toTimeString(amount)}</h3>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ width: '80%', mr: 1 }}>
          <LinearProgress variant="determinate" value={amountInPercentage} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{
          `${Math.round(amountInPercentage)}%`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
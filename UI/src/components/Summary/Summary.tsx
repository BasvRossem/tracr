import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { notIncludedInSummary } from '../../constants';
import { Log } from '../../types';

import { RootState } from '../../data/store';
import './Summary.css';
import { SummaryLog } from './SummaryLog';
import { SummaryLogElement } from './SummaryLogElement';

export function Summary() {
  const todaysLogs = useSelector((state: RootState) => state.logger.value.logs);

  const summaries: { [key: string]: SummaryLog } = {}

  todaysLogs
    .filter(element => !notIncludedInSummary.includes(element.title))
    .forEach((element: Log) => {
      if (!summaries[element.title]) {
        summaries[element.title] = { ticket: element.title, time: 0, text: "" };
      }

      summaries[element.title].ticket = element.title;
      summaries[element.title].time += new Date(element.stopTime).getTime() - new Date(element.startTime).getTime();
      summaries[element.title].text = element.notes;
    });

  return (
    <Box>

      {Object.keys(summaries).map((key) => SummaryLogElement(summaries[key]))}

    </Box>
  );
}
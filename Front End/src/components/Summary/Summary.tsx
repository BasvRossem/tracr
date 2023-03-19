import Box from '@mui/material/Box';

import { useSelector } from 'react-redux';
import { notIncludedInSummary } from '../../constants';
import { Log } from '../../types';

import './Summary.css';
import { SummaryLog } from './SummaryLog';
import { SummaryLogElement } from './SummaryLogElement';

export function Summary() {
  const todaysLogs = useSelector((state) => (state as any).logger);

  const summaries: {[key: string]: SummaryLog} = {}
  
  todaysLogs.value
    .filter((element: Log) => !notIncludedInSummary.includes(element.title))
    .forEach((element: Log) => {
      if(!summaries[element.title]) {
        summaries[element.title] = {ticket: element.title, time: 0, text: ""};
      }
      const currentSummary = summaries[element.title];
      currentSummary.ticket = element.title;
      currentSummary.time += new Date(element.stopTime).getTime() - new Date(element.startTime).getTime(); 
      
      currentSummary.text = element.notes;
    });
  
  return (
    <Box>
      <h3>Day summary</h3>
      <Box style={{marginLeft: '16px', marginRight: '16px'}}>
      {Object.keys(summaries).map((key) => SummaryLogElement(summaries[key]))}
      </Box>
    </Box>
  );
}
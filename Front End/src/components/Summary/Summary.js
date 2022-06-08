import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useSelector } from 'react-redux';
import { toTime } from '../../utils';

import './Summary.css';

class SummaryLog {
  ticket = "";
  time = 0;
  text = [];

  update(ticket, time, text) {
    this.ticket = ticket;
    this.time = time;
    this.text = text;
  }
}

function SummaryLogElement(props) {
  let clipboard = "";
  const lines = props.text.map(line => {
    clipboard += line + "\n";
    return (<span key={Math.random()} onClick={() => {navigator.clipboard.writeText(clipboard)}}>{line.replace('- ', '● ')}<br></br></span> )
  });

  const link = "https://mendrix.atlassian.net/browse/" + props.ticket;

  return (
    <Accordion className='SummaryLogElement' key={Math.random()}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography><b><a href={link} target="_blank" rel="noreferrer"> {props.ticket}</a></b> - {toTime(props.time)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        {lines}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}

export function Summary() {
  const todaysLogs = useSelector((state) => state.logger);

  const summaries = {}
  
  todaysLogs.value.forEach(element => {
    if(!summaries[element.title]) {
      summaries[element.title] = new SummaryLog();
    }
    const currentSummary = summaries[element.title];
    currentSummary.ticket = element.title;
    currentSummary.time += new Date(element.stopTime) - new Date(element.startTime); 
    
    const text = element.notes[0] !== "-" ? ["- " + element.notes] : element.notes.split('\n');
    text.forEach(t => currentSummary.text.push(t));
    currentSummary.key = element.title;
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
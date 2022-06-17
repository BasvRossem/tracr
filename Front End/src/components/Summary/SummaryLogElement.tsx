import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toTimeString } from '../../utils';
import { SummaryLog } from "./SummaryLog";
import { JIRA_URL } from '../../constants';

export function SummaryLogElement(props: SummaryLog) {
  let clipboard = "";
  const lines = props.text.map(line => {
    clipboard += line + "\n";
    return (<span key={Math.random()} onClick={() => { navigator.clipboard.writeText(clipboard); }}>{line.replace('- ', '● ')}<br></br></span>);
  });

  const link = JIRA_URL + props.ticket;

  return (
    <Accordion className='SummaryLogElement' key={Math.random()}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography><b><a href={link} target="_blank" rel="noreferrer"> {props.ticket}</a></b> - {toTimeString(props.time)}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {lines}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

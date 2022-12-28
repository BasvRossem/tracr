import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toTimeString } from '../../utils';
import { SummaryLog } from "./SummaryLog";
import { JIRA_URL } from '../../constants';

export function SummaryLogElement(props: SummaryLog) {
  let clipboard = props.text.join("\n");
  const lines = props.text.map((line, index) => {
    return (<span key={index} onClick={() => { navigator.clipboard.writeText(clipboard); }}>{line.replace('- ', '● ')}<br></br></span>);
  });

  const link = JIRA_URL + props.ticket;

  return (
    <Accordion className='SummaryLogElement' key={props.ticket}>
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

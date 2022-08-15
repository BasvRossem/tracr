import * as React from 'react';
import TextField from '@mui/material/TextField';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';

import { tickets } from '../../constants';

interface TicketListProps {
  onItemClick: (ticketTitle: string) => void;
}

export function TicketList(props: TicketListProps) {
  const [ticketFilter, setTicketFilter] = React.useState("");

  const filteredTickets = tickets.filter(t => 
    t.toString().toLowerCase().includes(ticketFilter.toLowerCase())
  );
  
  const ticketItems = filteredTickets.map(ticket => (
    <Tooltip title={ticket.tooltip} placement="right" key={ticket.title}>
      <ListItemButton 
        onClick={() => props.onItemClick(ticket.title)}
      >
        <ListItemText primary={ticket.title + " " + ticket.name} />
      </ListItemButton>
    </Tooltip>
  ));

  return (
    <div className='log-modal-tickets'>
      <TextField
        label="Ticket"
        variant="standard"
        className="log-modal-title"
        onChange={(data) => setTicketFilter(data.target.value)}
      />
      <List > {ticketItems} </List>
    </ div>
  )
}
import * as React from 'react';
import TextField from '@mui/material/TextField';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';

import { ticketsTextOnly } from '../../constants';
import { Autocomplete, Button, Typography } from '@mui/material';
import { Ticket } from '../../types/ticket';

interface TicketListProps {
  value?: string;
  onChange: (value: string) => void;
}

type TicketOption = {id: number, label: string, ticket: Ticket};

export function TicketList(props: TicketListProps) {
  const [value, setValue] = React.useState<TicketOption | null | string>(props.value ?? null);

  const stripInput = (value: TicketOption) => {
    if (!value) return;
    const ticketNr = value.label.substring(value.label.indexOf("["), value.label.indexOf("]") + 1)
    const newValue = ticketNr === "" ? value.label : ticketNr;
    setValue(newValue);
    props.onChange(newValue);
  }

  return (
    <Autocomplete
      disablePortal
      freeSolo
      className="log-modal-title"
      options={ticketsTextOnly}
      value={value}
      onChange={(_, newValue: TicketOption | null) => {
        stripInput(newValue);
      }}
      renderInput={(params) => <TextField {...params} onChange={(data) => props.onChange(data.target.value)} label="Title" />}
      renderOption={(props, option: TicketOption) =>
        <li {...props}>
          <Tooltip title={option.ticket.tooltip} placement="right" key={option.ticket.title}>
            <Typography variant="body1">
              {`[${option.ticket.title}] ${option.ticket.name}`}
            </Typography>
          </Tooltip>
        </li>
      }
    />
  )
}
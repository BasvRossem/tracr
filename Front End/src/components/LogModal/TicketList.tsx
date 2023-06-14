import * as React from 'react';
import { Autocomplete, Typography, Tooltip, TextField } from '@mui/material';
import { ticketsTextOnly } from '../../constants';
import { Ticket } from '../../types/ticket';

interface TicketListProps {
  value?: string;
  onChange: (value: string) => void;
}

type TicketOption = { id: number, label: string, ticket: Ticket };

export function TicketList(props: TicketListProps) {
  const [value, setValue] = React.useState<TicketOption | null | string>(props.value ?? null);

  const stripInput = (value: TicketOption | string) => {
    if (!value) return;

    if (typeof value === "string") {
      return value;
    }

    const ticketNr = value.label.substring(value.label.indexOf("[") + 1, value.label.indexOf("]"))
    return ticketNr === "" ? value.label : ticketNr;
  }

  return (
    <Autocomplete
      disablePortal
      freeSolo
      className="log-modal-title"
      options={ticketsTextOnly}
      value={value}
      onChange={(_, newValue: TicketOption | string) => {
        const title = stripInput(newValue);
        setValue(title);
        props.onChange(title);
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
import moment from 'moment';

import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import MuiSpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import store from '../../data/store';

interface SpeedDialProps {
  setLog: React.Dispatch<any>;
  openCreateModal: () => void;
}

export function SpeedDial(props: SpeedDialProps) {
  const quickActions = [
    {
      name: "Stand-up",
      onClick: () => {
        const date = new Date(store.getState().currentDate.value);
        props.setLog({
          title: "BLT-1817",
          startTime: moment(date).startOf("day").set("hours", 10).toDate(),
          stopTime: moment(date).startOf("day").set("hours", 10).set("minutes", 30).toDate(),
          notes: ("Stand-up")
        });
        props.openCreateModal();
      },
      icon: <AccessibilityNewIcon />
    }
  ];

  return (
    <MuiSpeedDial
      ariaLabel="SpeedDial playground example"
      icon={<SpeedDialIcon />}
      sx={{ position: "absolute", bottom: 16, right: 16 }}
    >
      {quickActions.map((item) => {
        return (<SpeedDialAction
          key={item.name}
          icon={item.icon}
          tooltipTitle={item.name}
          onClick={item.onClick}
        />)
      })}
    </MuiSpeedDial>
  );
}
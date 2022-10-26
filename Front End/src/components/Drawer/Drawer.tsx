import * as React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerStyle = {
  width: 400,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 400,
    boxSizing: 'border-box'
  }
};

export function Drawer(props: { collapsible: boolean, children: React.ReactNode }) {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      if (event.clientX < 3 && !drawerIsOpen) setDrawerIsOpen(true);
    });
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setDrawerIsOpen(open);
  };

  if (props.collapsible) {
    return (
      <SwipeableDrawer
        anchor="left"
        sx={drawerStyle}
        open={drawerIsOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {props.children}
      </SwipeableDrawer>)
  } else {
    return (
      <MuiDrawer
        sx={drawerStyle}
        variant="permanent"
        anchor="left"
      >
        {props.children}
      </MuiDrawer>
    )
  }
}

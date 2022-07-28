import {useState, useEffect, KeyboardEvent, MouseEvent} from 'react';
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

export function Drawer(props: {collapseable: boolean, children: any}) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  
  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      if(event.clientX < 3 && !drawerIsOpen) setDrawerIsOpen(true);
    });
  }, []);

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    setDrawerIsOpen(open);
  };

  if(props.collapseable) {
    return (      <SwipeableDrawer
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

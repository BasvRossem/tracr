import MuiDrawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import * as React from 'react';

const drawerStyle = {
  width: 400,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 400,
    boxSizing: 'border-box'
  }
};

const drawerStyleTop = {
  width: "100%",
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: "100%",
    boxSizing: 'border-box'
  }
};

function getWindowDimensions() {
  return { width: window.innerWidth, height: window.innerHeight };
}

export function Drawer(props: { children: React.ReactNode }) {
  const [drawerIsOpen, setDrawerIsOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      if (event.clientY < 3 && !drawerIsOpen) setDrawerIsOpen(true);
    });
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    setDrawerIsOpen(open);
  };

  const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());
  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const collapsible = windowDimensions.height > windowDimensions.width;
  if (collapsible) {
    return (
      <SwipeableDrawer
        anchor="top"
        sx={drawerStyleTop}
        open={drawerIsOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {props.children}
      </SwipeableDrawer >)
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

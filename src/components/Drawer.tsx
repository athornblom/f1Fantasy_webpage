import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Collapse, IconButton, Link } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ListItemButton } from '@mui/material';

const header = (data: any) => {
  let emptyArray: any = [];
  removeEveryOther(data).forEach((element: any) => {
    emptyArray.push(element[0]);
  });
  return emptyArray;
};
const removeEveryOther = (xs: any) => {
  return xs.filter((element: any, index: any) => {
    return index % 2 === 0;
  });
};
const removeOdd = (xs: any) => {
  return xs.filter((element: any, index: any) => {
    return index % 2 !== 0;
  });
};

function Drawer({ data, showDrawer, toggleDrawer }: any) {
  return (
    <SwipeableDrawer
      anchor="left"
      open={showDrawer}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {header(data).map((text: any, index: any) => (
            <Row
              key={index}
              racesLink={removeOdd(data)[index]}
              races={removeEveryOther(data)[index]}
            />
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}

export default Drawer;

function Row(props: any) {
  const { racesLink, races } = props;
  const [raceLinks, setRaceLink] = React.useState(racesLink);
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <ListItem button key={races[0]} onClick={() => setOpen(!open)}>
        <ListItemIcon>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </ListItemIcon>
        <ListItemText primary={races[0]} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          <ListItemButton key={raceLinks[0]}>
            <Link
              sx={{ textDecoration: 'none', color: 'inherit' }}
              href={`/${raceLinks[0]}`}
            >
              <ListItemText primary={'Standings'} />
            </Link>
          </ListItemButton>
          {races.slice(1).map((text: any, index: any) => (
            <ListItemButton key={text}>
              <Link
                sx={{ textDecoration: 'none', color: 'inherit' }}
                href={`/races/${raceLinks[index + 1]}`}
              >
                <ListItemText primary={text} />
              </Link>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <Divider />
    </>
  );
}

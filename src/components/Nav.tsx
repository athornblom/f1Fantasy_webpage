import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Nav({ toggleDrawer }: any) {
  const [color, setColor] = useState('dark');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" enableColorOnDark>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography
            sx={{ marginBottom: '-6px', display: { xs: 'none', md: 'block' } }}
          >
            <Image
              layout="fixed"
              src="/f1_logo.svg"
              width="80"
              height="50"
              alt="f1 logo"
            />
          </Typography> */}
          <Link href="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              KOLV CUPEN by LIFE ENERGY
            </Typography>
          </Link>
          {/* <IconButton color="inherit" onClick={() => {}}>
            {color == 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

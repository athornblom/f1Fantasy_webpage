import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      sx={{ marginBottom: '20px' }}
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {'Copyright © '}
      <MuiLink
        color="inherit"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      >
        KVS holdings
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

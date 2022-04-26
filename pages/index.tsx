import type { NextPage } from 'next';
import Loading from '../src/components/Loading';
import { google } from 'googleapis';
import { getAuthToken } from '../src/utils/getAuthToken';
import { sheetQuery } from '../src/utils/sheetQuery';
import { Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <>
      <Typography sx={{ my: '80px' }}>
        This page is not done check races using the hamburger menu
      </Typography>
    </>
  );
};

export default Home;

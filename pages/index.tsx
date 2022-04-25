import type { NextPage } from 'next';
import Loading from '../src/components/Loading';
import { google } from 'googleapis';
import { getAuthToken } from '../src/utils/getAuthToken';
import { sheetQuery } from '../src/utils/sheetQuery';
import { Typography } from '@mui/material';

export async function getServerSideProps() {
  const data = await sheetQuery('Statistik', 'D2:F16');
  return {
    notFound: data.length == 0 ? true : false,
    props: {
      data,
    },
  };
}

interface Props {
  data: any;
}
const Home: NextPage<Props> = ({ data }) => {
  return (
    <>
      <Typography sx={{ my: '80px' }}>
        This page is not done check races using the hamburger menu
      </Typography>
    </>
  );
};

export default Home;

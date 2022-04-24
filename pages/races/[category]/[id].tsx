import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { google } from 'googleapis';
import { getAuthToken } from '../../../src/utils/getAuthToken';
import { sheetQuery } from '../../../src/utils/sheetQuery';
import Podium from '../../../src/components/standings/Podium';

export async function getServerSideProps(context: any) {
  const data = await sheetQuery(context.query.id, 'B2:N17');
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

const Race: NextPage<Props> = ({ data }) => {
  const router = useRouter();
  const { category, id } = router.query;
  return (
    <Container sx={{ paddingTop: '50px' }}>
      <Box sx={{ my: 4 }}>
        <Podium
          title={`${
            (id as string).charAt(0).toUpperCase() + id!.slice(1)
          } Result`}
          rows={data}
        />
        {/* <StandingsTable rows={data} /> */}
      </Box>
    </Container>
  );
};

export default Race;

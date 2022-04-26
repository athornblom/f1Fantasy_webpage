import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Podium from '../src/components/standings/Podium';
import StandingsTable from '../src/components/standings/StandingsTable';
import { css, jsx } from '@emotion/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Loading from '../src/components/Loading';
// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Stanadings: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/api/getStandings/Statistik`, fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <Loading />;
  return (
    <Container maxWidth={false} sx={{ maxWidth: '1840px', paddingTop: '50px' }}>
      <Box sx={{ my: 4 }}>
        <Podium title={`${id} Standings`} rows={data.data} />
        <StandingsTable rows={data} />
        {console.log(data)}
      </Box>
    </Container>
  );
};

export default Stanadings;

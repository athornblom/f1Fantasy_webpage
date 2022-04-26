import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { sheetQuery } from '../../../src/utils/sheetQuery';
import Podium from '../../../src/components/standings/Podium';
import StandingsTable from '../../../src/components/standings/StandingsTable';
import useSWR from 'swr';
import Loading from '../../../src/components/Loading';

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Race: NextPage = () => {
  const router = useRouter();
  const { category, id } = router.query;

  const { data, error } = useSWR(`/api/getRaces/${id}`, fetcher);
  if (error) return <h1>Ooops, somethings broke</h1>;
  if (!data) return <Loading></Loading>;

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1540px', paddingTop: '50px' }}>
      <Box sx={{ my: 4 }}>
        <Podium
          title={`${
            (id as string).charAt(0).toUpperCase() + id!.slice(1)
          } Result`}
          rows={data.data}
        />
        <StandingsTable rows={data} />
      </Box>
    </Container>
  );
};

export default Race;

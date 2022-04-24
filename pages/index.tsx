import type { NextPage } from 'next';
import Loading from '../src/components/Loading';
import { google } from 'googleapis';
import { getAuthToken } from '../src/utils/getAuthToken';
import { sheetQuery } from '../src/utils/sheetQuery';

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
      <ul>
        {data.map((row: any) => (
          <li key={row[0]}>{row}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;

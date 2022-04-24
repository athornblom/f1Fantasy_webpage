import type { NextPage } from 'next';
import Loading from '../src/components/Loading';
import { google } from 'googleapis';
import { getAuthToken } from '../src/utils/getAuthToken';

export async function getServerSideProps() {
  const auth = await getAuthToken();

  const sheets = google.sheets({ version: 'v4', auth });

  // const { id } = query;
  const range = `Statistik!D2:E16`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const data = response.data.values;

  return {
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
type AppProps = {
  message: string;
};

export default Home;

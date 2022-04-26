import { google } from 'googleapis';
import { getAuthToken } from '../../../src/utils/getAuthToken';

export default async function handler(req: any, res: any) {
  //   console.log(req.query.id);
  //    auth
  const auth = await getAuthToken();
  const sheets = google.sheets({ version: 'v4', auth });

  const range = `${req.query.id}!D1:S16`;
  let data: any = [];

  //    querry
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });
    data = response.data.values;
  } catch (error) {}

  //    result
  const header = createHeader(data[0]);
  let rows: any = [];
  data.slice(1).forEach((row: any) => {
    rows.push(createData(row));
  });
  data = rows.sort((a: any, b: any) => {
    if (parseFloat(a.totPoints) > parseFloat(b.totPoints)) return 1;
    else if (parseFloat(a.totPoints) < parseFloat(b.totPoints)) return -1;
    else return 0;
  });

  res.status(200).json({ header: header, data: data });
  //    console.log(posts);
}

function createHeader(head: any) {
  if (!head) {
    return [];
  }
  return [
    // {
    //   id: 'placement',
    //   numeric: true,
    //   padding: false,
    //   label: head[0],
    //   showOnMobile: true,
    //   showByDefault: true,
    // },
    {
      id: 'team',
      numeric: false,
      padding: 'none',
      label: head[0],
      showOnMobile: true,
      showByDefault: true,
    },
    {
      id: 'owner',
      numeric: false,
      padding: 'none',
      label: head[1],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'totPoints',
      numeric: true,
      padding: 'none',
      label: head[2],
      showOnMobile: true,
      showByDefault: true,
    },
    {
      id: 'avgPoints',
      numeric: true,
      padding: 'none',
      label: head[3],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'lowestPoints',
      numeric: true,
      padding: 'none',
      label: head[4],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'lowestRank',
      numeric: true,
      padding: 'none',
      label: head[5],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'highestPoints',
      numeric: true,
      padding: 'none',
      label: head[6],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'highestRank',
      numeric: true,
      padding: 'none',
      label: head[7],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'winnerWeekends',
      numeric: true,
      padding: 'none',
      label: head[8],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'ammountBestWeekend',
      numeric: true,
      padding: 'none',
      label: head[9],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'worstPlacementTot',
      numeric: true,
      padding: 'none',
      label: head[10],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'bestPlacementTot',
      numeric: true,
      padding: 'none',
      label: head[11],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'worstPlacementRW',
      numeric: true,
      padding: 'none',
      label: head[12],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'bestPlacementRW',
      numeric: true,
      padding: 'none',
      label: head[13],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'avgPlacementRW',
      numeric: true,
      padding: 'none',
      label: head[14],
      showOnMobile: false,
      showByDefault: true,
    },
  ];
}

function createData([
  //   placement,
  team,
  owner,
  totPoints,
  avgPoints,
  lowestPoints,
  lowestRank,
  highestPoints,
  highestRank,
  winnerWeekends,
  ammountBestWeekend,
  worstPlacementTot,
  bestPlacementTot,
  worstPlacementRW,
  bestPlacementRW,
  avgPlacementRW,
  image,
]: any) {
  return {
    // placement,
    team,
    owner,
    totPoints,
    avgPoints,
    lowestPoints,
    lowestRank,
    highestPoints,
    highestRank,
    winnerWeekends,
    ammountBestWeekend,
    worstPlacementTot,
    bestPlacementTot,
    worstPlacementRW,
    bestPlacementRW,
    avgPlacementRW,
    image,
  };
}

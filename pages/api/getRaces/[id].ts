import { google } from 'googleapis';
import { getAuthToken } from '../../../src/utils/getAuthToken';

export default async function handler(req: any, res: any) {
  //   console.log(req.query.id);
  //    auth
  const auth = await getAuthToken();
  const sheets = google.sheets({ version: 'v4', auth });

  const range = `${req.query.id}!B2:P17`;
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
  data = rows;

  res.status(200).json({ header: header, data: data });
  //    console.log(posts);
}

function createHeader(head: any) {
  if (!head) {
    return [];
  }
  return [
    {
      id: 'placement',
      numeric: true,
      disablePadding: false,
      label: head[0],
      showOnMobile: true,
      showByDefault: true,
    },
    {
      id: 'deltaPlacement',
      numeric: true,
      disablePadding: false,
      label: head[1],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'team',
      numeric: false,
      disablePadding: false,
      label: head[2],
      showOnMobile: true,
      showByDefault: true,
    },
    {
      id: 'owner',
      numeric: false,
      disablePadding: false,
      label: head[3],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'doge',
      numeric: false,
      disablePadding: false,
      label: head[4],
      showOnMobile: false,
      showByDefault: false,
    },
    {
      id: 'points',
      numeric: true,
      disablePadding: false,
      label: head[5],
      showOnMobile: true,
      showByDefault: true,
    },
    {
      id: 'RW',
      numeric: true,
      disablePadding: false,
      label: head[6],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'totPoints',
      numeric: true,
      disablePadding: false,
      label: head[7],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'pointDiff',
      numeric: true,
      disablePadding: false,
      label: head[8],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'TurboDriver',
      numeric: false,
      disablePadding: false,
      label: head[9],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'MD',
      numeric: true,
      disablePadding: false,
      label: head[10],
      showOnMobile: false,
      showByDefault: false,
    },
    {
      id: 'MegaDriver',
      numeric: false,
      disablePadding: false,
      label: head[11],
      showOnMobile: false,
      showByDefault: false,
    },
    {
      id: 'Value',
      numeric: true,
      disablePadding: false,
      label: head[12],
      showOnMobile: false,
      showByDefault: true,
    },
    {
      id: 'deltaValue',
      numeric: true,
      disablePadding: false,
      label: head[13],
      showOnMobile: false,
      showByDefault: true,
    },
  ];
}

function createData([
  placement,
  deltaPlacement,
  team,
  owner,
  doge,
  points,
  RW,
  totPoints,
  pointDiff,
  TurboDriver,
  MD,
  MegaDriver,
  Value,
  deltaValue,
  image,
]: any) {
  return {
    placement,
    deltaPlacement,
    team,
    owner,
    doge,
    points,
    RW,
    totPoints,
    pointDiff,
    TurboDriver,
    MD,
    MegaDriver,
    Value,
    deltaValue,
    image,
  };
}

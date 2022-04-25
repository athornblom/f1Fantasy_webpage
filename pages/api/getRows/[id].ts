import { google } from 'googleapis';
import { getAuthToken } from '../../../src/utils/getAuthToken';

export default async function handler(req: any, res: any) {
  //   console.log(req.query.id);
  //    auth
  const auth = await getAuthToken();
  const sheets = google.sheets({ version: 'v4', auth });

  const range = `${req.query.id}`;
  let data: any = [];

  //    querry
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });
    data = response.data.values;
  } catch (error) {}

  res.status(200).json(data);
  //    console.log(posts);
}

import { google } from 'googleapis';
import { getAuthToken } from './getAuthToken';

export async function sheetQuery(sheet: string, s_range: string) {
  const auth = await getAuthToken();

  const sheets = google.sheets({ version: 'v4', auth });

  // const { id } = query;
  const range = `${sheet}!${s_range}`;
  const data: any = [];
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });
    const data = response.data.values;
    return data;
  } catch (error) {}

  return data;
}

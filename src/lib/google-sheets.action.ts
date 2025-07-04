import { google } from 'googleapis';
import { JadwalBooking } from './types';

const credentialBase64 = process.env.GOOGLE_CREDENTIALS_BASE64;
const credentialJSONString = Buffer.from(
	credentialBase64 as string,
	'base64',
).toString('utf8');
const credentials = JSON.parse(credentialJSONString);
credentials.private_key = credentials.private_key
	.split(String.raw`\n`)
	.join('\n');

const auth = await google.auth.getClient({
	projectId: process.env.PROJECT_ID,
	credentials,
	scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const gSheets = google.sheets({ version: 'v4', auth });

export async function getAllJadwal() {
	const response = await gSheets.spreadsheets.values.get({
		spreadsheetId: process.env.SPREADSHEET_ID,
		range: 'Jadwal Postingan!A:D',
	});

	const data = response.data.values as unknown as JadwalBooking[];
	return [...data.slice(1)].map((item) => {
		return {
			judul: item[0],
			tanggal_posting: item[1],
			jam_posting: item[2],
			link_gdrive: item[3],
		};
	});
}

export async function addJadwal(data: JadwalBooking) {
	await gSheets.spreadsheets.values.append({
		auth,
		spreadsheetId: process.env.SPREADSHEET_ID,
		range: 'Jadwal Postingan!A:D',
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [
				[
					data.judul,
					data.tanggal_posting,
					data.jam_posting,
					data.link_gdrive,
				],
			],
		},
	});
}

import { google } from 'googleapis';
import { JadwalBooking } from './types';
import { v4 as uuidv4 } from 'uuid';

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

export function getDataWithoutHeader(data: string[]) {
	return [...data.slice(1)].map((item) => {
		return {
			id: item[0],
			judul: item[1],
			tanggal_posting: item[2],
			jam_posting: item[3],
			link_gdrive: item[4],
		};
	}) as JadwalBooking[];
}

export async function getAllJadwal() {
	const response = await gSheets.spreadsheets.values.get({
		spreadsheetId: process.env.SPREADSHEET_ID,
		range: 'Jadwal Postingan!A:E',
	});

	const data = response.data.values as unknown as string[];
	return data;
}

export async function addJadwal(data: JadwalBooking) {
	await gSheets.spreadsheets.values.append({
		auth,
		spreadsheetId: process.env.SPREADSHEET_ID,
		range: 'Jadwal Postingan!A:E',
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [
				[
					uuidv4(),
					data.judul,
					data.tanggal_posting,
					data.jam_posting,
					data.link_gdrive,
				],
			],
		},
	});
}

export async function editJadwal(data: JadwalBooking) {
	const prevData = await getAllJadwal();
	const currentData = prevData.map((jadwal) => {
		if (jadwal[0] == data.id) {
			return [
				jadwal[0],
				data.judul,
				data.tanggal_posting,
				data.jam_posting,
				data.link_gdrive,
			];
		} else {
			return jadwal;
		}
	});
	await gSheets.spreadsheets.values.update({
		auth,
		spreadsheetId: process.env.SPREADSHEET_ID,
		range: 'Jadwal Postingan!A:E',
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: currentData as unknown as string[][],
		},
	});
}

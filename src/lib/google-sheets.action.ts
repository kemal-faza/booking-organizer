import { google } from 'googleapis';
import { JadwalBooking } from './types';

const auth = await google.auth.getClient({
	projectId: process.env.PROJECT_ID,
	credentials: {
		type: process.env.TYPE,
		project_id: process.env.PROJECT_ID,
		private_key_id: process.env.PRIVATE_KEY_ID,
		private_key: process.env.PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
		client_email: process.env.CLIENT_EMAIL,
		universe_domain: process.env.UNIVERSE_DOMAIN,
	},
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

import { google } from 'googleapis';

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

async function getSheetIdByName(sheetName: string) {
	const response = await gSheets.spreadsheets.get({
		spreadsheetId: process.env.SPREADSHEET_ID,
		auth,
	});
	const sheet = response.data.sheets?.find(
		(s) => s.properties?.title === sheetName,
	);
	return sheet?.properties?.sheetId;
}

export async function getAllData(range: string) {
	const response = await gSheets.spreadsheets.values.get({
		spreadsheetId: process.env.SPREADSHEET_ID,
		range,
	});

	const data = response.data.values as unknown as string[];
	return data;
}

export async function addData(range: string, data: string[]) {
	await gSheets.spreadsheets.values.append({
		auth,
		spreadsheetId: process.env.SPREADSHEET_ID,
		range,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [data as unknown as string[]],
		},
	});
}

export async function editData(range: string, data: string[][]) {
	await gSheets.spreadsheets.values.update({
		auth,
		spreadsheetId: process.env.SPREADSHEET_ID,
		range,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: data as unknown as string[][],
		},
	});
}

export async function deleteData(index: number, sheetName: string) {
	const sheetId = await getSheetIdByName(sheetName);
	await gSheets.spreadsheets.batchUpdate({
		auth,
		spreadsheetId: process.env.SPREADSHEET_ID,
		requestBody: {
			requests: [
				{
					deleteDimension: {
						range: {
							sheetId,
							dimension: 'ROWS',
							startIndex: index,
							endIndex: index + 1,
						},
					},
				},
			],
		},
	});
}

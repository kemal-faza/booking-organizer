'use server';
import { revalidatePath } from 'next/cache';
import { JadwalBooking } from './types';
import { redirect } from 'next/navigation';
import {
	addData,
	deleteData,
	editData,
	getAllData,
} from './google-sheets.action';
import { v4 as uuidv4 } from 'uuid';
import { rangeJadwalPosting } from './data';
import { makeKeyword } from './utils';

export async function getJadwalWithoutHeader(data: string[]) {
	return [...data.slice(1)].map((item) => {
		return {
			id: item[0],
			keyword: item[1],
			judul: item[2],
			tanggal_posting: item[3],
			jam_posting: item[4],
			link_gdrive: item[5],
		};
	}) as JadwalBooking[];
}

export async function getAllJadwal() {
	const data = await getAllData(rangeJadwalPosting);
	return data;
}

export async function handleFormAddJadwal(dataJadwal: JadwalBooking) {
	await addData(rangeJadwalPosting, [
		uuidv4(),
		makeKeyword(
			dataJadwal.judul,
			dataJadwal.tanggal_posting,
			dataJadwal.jam_posting,
		),
		dataJadwal.judul,
		dataJadwal.tanggal_posting,
		dataJadwal.jam_posting,
	]);

	revalidatePath('/');
}

export async function handleFormEditJadwal(
	id: string,
	dataJadwal: JadwalBooking,
) {
	const prevData = await getAllJadwal();
	const currentData = prevData.map((jadwal) => {
		if (jadwal[0] == id) {
			return [
				jadwal[0],
				makeKeyword(
					dataJadwal.judul,
					dataJadwal.tanggal_posting,
					dataJadwal.jam_posting,
				),
				dataJadwal.judul,
				dataJadwal.tanggal_posting,
				dataJadwal.jam_posting,
			];
		}
		return jadwal;
	});
	await editData(rangeJadwalPosting, currentData as unknown as string[][]);

	revalidatePath('/');
}

export async function deleteJadwal(id: string) {
	let indexJadwal;
	const prevData = await getAllJadwal();
	prevData.forEach((jadwal, index) => {
		if (jadwal[0] == id) {
			indexJadwal = index;
		}
		return jadwal[0] !== id;
	});

	await deleteData(indexJadwal as unknown as number, 'Jadwal Postingan');

	revalidatePath('/');
	redirect('/');
}

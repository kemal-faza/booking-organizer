'use server';
import { z } from 'zod/v4';
import { jadwalPosting } from './utils';
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

export async function getJadwalWithoutHeader(data: string[]) {
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
	const data = await getAllData('Jadwal Postingan!A:E');
	return data;
}

export async function handleFormAddJadwal(
	previousState: unknown,
	formData: FormData,
) {
	const validatedData = jadwalPosting.safeParse({
		judul: formData.get('judul'),
		tanggal_posting: formData.get('tanggal_posting'),
		jam_posting: formData.get('jam_posting'),
		link_gdrive:
			'https://drive.google.com/drive/folders/1-xAXHp4u1OSj6b1Fxeb6C5a2dhleiMJt?usp=drive_link',
	});

	if (!validatedData.success) {
		return {
			data: {
				judul: formData.get('judul'),
				tanggal_posting: formData.get('tanggal_posting'),
				jam_posting: formData.get('jam_posting'),
				link_gdrive:
					'https://drive.google.com/drive/folders/1-xAXHp4u1OSj6b1Fxeb6C5a2dhleiMJt?usp=drive_link',
			} as JadwalBooking,
			errors: z.flattenError(validatedData.error),
		};
	}

	await addData('Jadwal Postingan!A:E', [
		uuidv4(),
		validatedData.data.judul,
		validatedData.data.tanggal_posting,
		validatedData.data.jam_posting,
		validatedData.data.link_gdrive,
	]);

	revalidatePath('/');
	redirect('/');
}

export async function handleFormEditJadwal(
	id: string,
	previousState: unknown,
	formData: FormData,
) {
	const validatedData = jadwalPosting.safeParse({
		judul: formData.get('judul'),
		tanggal_posting: formData.get('tanggal_posting'),
		jam_posting: formData.get('jam_posting'),
		link_gdrive:
			'https://drive.google.com/drive/folders/1-xAXHp4u1OSj6b1Fxeb6C5a2dhleiMJt?usp=drive_link',
	});

	if (!validatedData.success) {
		return {
			data: {
				judul: formData.get('judul'),
				tanggal_posting: formData.get('tanggal_posting'),
				jam_posting: formData.get('jam_posting'),
				link_gdrive:
					'https://drive.google.com/drive/folders/1-xAXHp4u1OSj6b1Fxeb6C5a2dhleiMJt?usp=drive_link',
			} as JadwalBooking,
			errors: z.flattenError(validatedData.error),
		};
	}

	const prevData = await getAllJadwal();
	const currentData = prevData.map((jadwal) => {
		if (jadwal[0] == id) {
			return [
				jadwal[0],
				validatedData.data.judul,
				validatedData.data.tanggal_posting,
				validatedData.data.jam_posting,
				validatedData.data.link_gdrive,
			];
		} else {
			return jadwal;
		}
	});
	await editData(
		'Jadwal Postingan!A:E',
		currentData as unknown as string[][],
	);

	revalidatePath('/');
	redirect('/');
}

export async function deleteJadwal(id: string) {
	let indexJadwal;
	const prevData = await getAllJadwal();
	prevData.forEach((jadwal, index) => {
		if (jadwal[0] == id) {
			indexJadwal = index + 1;
		}
		return jadwal[0] !== id;
	});

	const range = `Jadwal Postingan!A${indexJadwal}:E${indexJadwal}`;

	await deleteData(range);

	revalidatePath('/');
	redirect('/');
}

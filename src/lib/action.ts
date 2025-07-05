'use server';
import { z } from 'zod/v4';
import { jadwalPosting } from './utils';
import { revalidatePath } from 'next/cache';
import { JadwalBooking } from './types';
import { redirect } from 'next/navigation';
import { addJadwal, editJadwal } from './google-sheets.action';

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

	await addJadwal(validatedData.data as JadwalBooking);

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

	await editJadwal({ id, ...validatedData.data } as JadwalBooking);

	revalidatePath('/');
	redirect('/');
}

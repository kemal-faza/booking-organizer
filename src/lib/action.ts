'use server';
import { z } from 'zod/v4';
import { jadwalPosting } from './utils';
import { revalidatePath } from 'next/cache';
import { JadwalBooking } from './types';
import { redirect } from 'next/navigation';
import { addJadwal } from './google-sheets.action';

export default async function handleFormAddJadwal(
	previousState: unknown,
	formData: FormData,
) {
	const validatedData = jadwalPosting.safeParse({
		judul: formData.get('judul'),
		tanggal_posting: formData.get('tanggal_posting'),
		jam_posting: formData.get('jam_posting'),
		link_gdrive: '',
	});

	if (!validatedData.success) {
		return {
			data: {
				judul: formData.get('judul'),
				tanggal_posting: formData.get('tanggal_posting'),
				jam_posting: formData.get('jam_posting'),
				link_gdrive: '',
			} as JadwalBooking,
			errors: z.flattenError(validatedData.error),
		};
	}

	await addJadwal(validatedData.data);

	revalidatePath('/');
	redirect('/');
}

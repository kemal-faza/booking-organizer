import { AnyFieldApi } from '@tanstack/react-form';
import { clsx, type ClassValue } from 'clsx';
import { DateTime, Settings } from 'luxon';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod/v4';
import { JadwalBooking } from './types';

Settings.defaultLocale = 'id';
Settings.defaultZone = 'Asia/Jakarta';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const jadwalPostingSchema = z.object({
	judul: z
		.string('Judul harus berupa string!')
		.nonempty('Judul tidak boleh kosong!'),
	tanggal_posting: z
		.string('Tanggal posting harus berupa string!')
		.refine((field) => field != 'Select date', {
			error: 'Tanggal posting harus diisi!',
			abort: true,
		}),
	jam_posting: z
		.string('Jam posting harus berupa string!')
		.nonempty('Jam posting tidak boleh kosong!'),
});

export function ErrorMessage({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && !field.state.meta.isValid ? (
				<p className="text-destructive font-medium text-xs md:text-sm text-justify ml-1">
					{field.state.meta.errors
						.map((err: z.ZodError) => err.message)
						.join(',')}
				</p>
			) : null}
			{field.state.meta.isValidating ? 'Validating...' : null}
		</>
	);
}

export function makeKeyword(
	judul: string,
	tanggal_posting: string,
	jam_posting: string,
) {
	const newTanggalPosting = tanggal_posting.split(',')[1];
	const newJamPosting = jam_posting.replace('.', ' ');
	return `${judul} ${newTanggalPosting} ${newJamPosting}`.toLowerCase();
}

export function teksBahanBooking(jadwal: JadwalBooking, type: string) {
	const jamSekarang = DateTime.now().hour;
	let waktu: string;
	if (jamSekarang >= 4 && jamSekarang <= 10) {
		waktu = 'pagi';
	} else if (jamSekarang >= 11 && jamSekarang <= 14) {
		waktu = 'siang';
	} else if (jamSekarang >= 15 && jamSekarang <= 17) {
		waktu = 'sore';
	} else {
		waktu = 'malam';
	}

	const tanggal = jadwal.tanggal_posting
		.split(', ')[1]
		.split(' ')
		.splice(0, 2)
		.join(' ');
	const jam = jadwal.jam_posting.split('.')[0];

	return `Selamat ${waktu}. Saya Muhamad Kemal Faza dari Biro Statistik. Izin mengirimkan bahan ${type} di ${tanggal} jam ${jam}. Untuk isi ${type}nya mengenai ${jadwal.judul}.
			Terima kasih.`;
}

export function teksBooking(allJadwal: JadwalBooking[], type: string) {
	const jamSekarang = DateTime.now().hour;
	let waktu: string;
	if (jamSekarang >= 4 && jamSekarang <= 10) {
		waktu = 'pagi';
	} else if (jamSekarang >= 11 && jamSekarang <= 14) {
		waktu = 'siang';
	} else if (jamSekarang >= 15 && jamSekarang <= 17) {
		waktu = 'sore';
	} else {
		waktu = 'malam';
	}

	if (allJadwal.length > 1) {
		let teks = `Selamat ${waktu}. Saya Muhamad Kemal Faza dari Biro Statistik. Izin membooking ${type} pada: `;
		allJadwal.forEach((jadwal, index) => {
			const tanggal = jadwal.tanggal_posting
				.split(', ')[1]
				.split(' ')
				.splice(0, 2)
				.join(' ');
			const jam = jadwal.jam_posting.split('.')[0];
			teks += `\n${index + 1}. ${tanggal} jam ${jam} mengenai ${
				jadwal.judul
			}`;
		});
		teks += '\nTerima kasih.';
		return teks;
	} else if (allJadwal.length == 1) {
		const jadwal = allJadwal[0];
		const tanggal = jadwal.tanggal_posting
			.split(', ')[1]
			.split(' ')
			.splice(0, 2)
			.join(' ');
		const jam = jadwal.jam_posting.split('.')[0];

		return `Selamat ${waktu}. Saya Muhamad Kemal Faza dari Biro Statistik. Izin membooking ${type} di ${tanggal} jam ${jam}. Untuk isi ${type}nya mengenai ${jadwal.judul}.\nTerima kasih.`;
	}
	return '';
}

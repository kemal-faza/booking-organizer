import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import * as z from 'zod/v4';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const jadwalPosting = z.object({
	judul: z
		.string('Judul harus berupa string!')
		.refine((field) => field !== '', {
			error: 'Kolom judul harus diisi!',
			abort: true,
		}),
	tanggal_posting: z
		.string('Tanggal posting harus berupa string!')
		.refine((field) => field !== '', {
			error: 'Kolom tanggal posting harus diisi!',
			abort: true,
		}),
	jam_posting: z
		.string('Jam posting harus berupa string!')
		.refine((field) => field !== '', {
			error: 'Kolom jam posting harus diisi!',
			abort: true,
		}),
	link_gdrive: z.string(),
});

export function showErrorMessage(message: string[] | undefined) {
	return (
		message && (
			<p className="text-destructive font-medium text-xs md:text-sm text-justify ml-1">
				{message}
			</p>
		)
	);
}

export function oldFormValue(value: undefined | string) {
	return value ? value : '';
}
